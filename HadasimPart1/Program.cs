using OfficeOpenXml;
using Parquet;
using Parquet.Schema;



class Program
{

    static void Main(string[] args)
    {
        //Part 1 - main
        ExcelPackage.License.SetNonCommercialPersonal("A.R.");

        string logsFilePath = "C:/לימודים/הדסים מטלת בית/logs.txt.xlsx";
        int N = 3;
        IEnumerable<KeyValuePair<string, int>> topErrors = findMostCommonErrorCode(logsFilePath, N);

        //print N top common error code
        //foreach (var kvp in topErrors){
        //    Console.WriteLine($"code: {kvp.Key}, apear: {kvp.Value} ");
        //}


        //סיבוכיות זמן מקום עברית 
        /*
         סיבוכיות זמן: O(n) סופי
        1)פונקציה: findMostCommonErrorCode רק מארגנת קוד: O(1)
        2)פןנקציה: splitFileToCsv קוראת קובץ פעם אחת: כמות שורות : n O(n)
        3)פונקציה: findCommonCodes לכל קובץ שומרת במילון קוד שגיאה, הכנסה ללמילון:O(1)
                    יוצא O(n)*O(1)=O(n)
                    רצה על כל המילונים לכל קובץ:גודל מילון m-כמות שגיאות
                    m<=n לכן O(n)

         סיבוכיות מקום:  O(n^2) סופית
        1)פונקציה: findMostCommonErrorCode O(1) 
        2)פונקציה: splitFileToCsv כמות שורות: n מחלק את הקובץ לחלקים קטנים: O(n)
        3)פונקציה: findCommonCodes כמות סוגי שגיאות: m לכן: O(m)
        -מס שגיאות <= מס הרשומות O(n*m)<=O(n^2)
         */

        //complexity time and place: english
        /*
         Time Complexity: The final time complexity is: O(n)
        1) function findMostCommonErrorCode: only organize code - O(1)
        2) function splitFileToCsv: read whole file once (number row in file = n) then: O(n)
        3) function findCommonCodes: for each file save in dictionary error_code: set in dictionary is O(1)
                then O(n)*O(1)=O(n)
                then run through all dict' (amount of error types = m & m<=n) for sorting: O(m)
       
          Place Complexity :The final Place Complexity is: O(n^2)
        1)function findMostCommonErrorCode: O(1)
        2)function splitFileToCsv:  splite file to smaller pieces O(n)
        3)function findCommonCodes: sum of error types: m, m<=n, O(n*m)<=O(n^2)
                                    
        */



        //Part 2 - main

        string time_series_FilePath_csv = "C:/לימודים/הדסים מטלת בית/time_series.csv";
        finalAvgCalulaterPerday(time_series_FilePath_csv);

        string time_series_FilePath_parquet = "C:/לימודים/הדסים מטלת בית/time_series.parquet";
        ReadParquetFile(time_series_FilePath_parquet).Wait();

        /*
         באם הנתונים היו מגיעים בזרימה ולא מקובץ:
         הייתי יוצרת Dictionary 
         המפתח הוא התאריך עם שעה מעוגלת
         הערך הוא אובקיט המכיל 2 שדות:1. ממוצע עכשיוי 2. מס הערכים שחושבו לממוצע זה: 
         כאשר נקרא רשומה חדשה בזרימה התוכנית פונה למקום המתאים במילון לפי התאריך והשעה
         מחשבת את הממוצע החדש עי הנוסחה למציאת נוסחה על פי ממוצע קודם ומס הערכים הקודמים שחושבו:
         (ממוצע חדש=(ממוצע קודם * מס ערכים קודם + ערך חדש)/(מס ערכים קודם+1
         מעדכנת את הממוצע הקודם לממוצע החדש ומוסיפה 1 למס הערכים שוחשבו לממוצע זה
         וחזר חלילה...
         */


        /* היתרונות לשימוש בפורמט .parquet:
         -מאחר ועובד בצורת עמודות (ולא שורות כשאר סוגי קבצים) מצמצם זמן ריצה בכך שקוראים רק את הנתונים הרלוונטיים
          (זה תואם היטב קבצים המייצגים שאילתות כי השליפה לפי עמודות)
         -תופס מקום אחסון קטן יותר, כמו כן ניתן לדחוס אותן
         */

    }

    //Part_1

    public static IEnumerable<KeyValuePair<string, int>> findMostCommonErrorCode(string filePath, int N)
    {
        int numOfFiles = splitFileToCsv(filePath);
        return findCommonCodes(filePath,numOfFiles, N);
    }
    public static int splitFileToCsv(string path)
    {
        int maxRowsPerFile = 100000;
        int fileIndex = 1;

        using (var package = new ExcelPackage(new FileInfo(path)))
        {
            var worksheet = package.Workbook.Worksheets[0];//access to the first page (and only)
            int totalRows = worksheet.Dimension.Rows;
            int totalCols = worksheet.Dimension.Columns;

            string directoryPathForSplitedDocument = Path.GetDirectoryName(path);
            string folderPath = Path.Combine(directoryPathForSplitedDocument, "splitedFiles");//new folder for splited files
            Directory.CreateDirectory(folderPath); //(if not exist create)


            for (int startRow = 1; startRow <= totalRows; startRow += maxRowsPerFile)
            {
                string newFileName = Path.Combine(folderPath, $"split_file_{fileIndex}.csv");
                //using (File.Create(newFileName))
                using (StreamWriter writetext = new StreamWriter(newFileName))
                {

                    for (int row = 1; row <= maxRowsPerFile && startRow + row <= totalRows; row++)
                    {
                        writetext.WriteLine(worksheet.Cells[startRow + row, 1].Text, ',', worksheet.Cells[startRow + row, 2].Text);
                    }
                }
                fileIndex++;
            }
        }

        return fileIndex - 1;
    }
    public static IEnumerable<KeyValuePair<string, int>> findCommonCodes(string filePath,  int numOfFiles, int N)
    {

        Dictionary<string, int>[] errorCountsPerFile = new Dictionary<string, int>[numOfFiles];

        for (int i = 0; i < numOfFiles; i++)
        {
            errorCountsPerFile[i] = new Dictionary<string, int>();

            string directoryOfFile = Path.GetDirectoryName(filePath);
            string path = Path.Combine(directoryOfFile, $"splitedFiles/split_file_{i + 1}.csv");


            using (var reader = new StreamReader(path))
            {
                while (!reader.EndOfStream)
                {
                    var errorCode = reader.ReadLine().Split(',')[1].Split(':')[1];


                    if (errorCountsPerFile[i].TryGetValue(errorCode, out int count))
                    {
                        errorCountsPerFile[i][errorCode] = count + 1; // if exist :add
                    }
                    else
                    {
                        errorCountsPerFile[i][errorCode] = 1; // if not :start
                    }
                }
            }
        }
        Dictionary<string, int> totalErrorsCount = new Dictionary<string, int>();

        foreach (var errorDict in errorCountsPerFile)
        {
            if (errorDict == null) continue; // למנוע שגיאות אם יש אינדקסים ריקים

            foreach (var error in errorDict)
            {
                if (totalErrorsCount.ContainsKey(error.Key))
                {
                    totalErrorsCount[error.Key] += error.Value; // אם קיים כמות– נוסיף למספר הכולל
                }
                else
                {
                    totalErrorsCount[error.Key] = error.Value; // אם לא קיים – נכניס לראשונה
                }
            }
        }

        return totalErrorsCount.OrderByDescending(kvp => kvp.Value).Take(N);


    }

    //Part_2

    public static void finalAvgCalulaterPerday(string filePath)
    {
        splitFileByDay(filePath);

        float[][] finalAvgPerDay = new float[30][];

        string folderPath = Path.GetDirectoryName(filePath);

        for (int i = 0; i < finalAvgPerDay.Length; i++)
        {
            string currentFile = Path.Combine(folderPath, $"splitedFilesFromTimeSeries/split_file_by_day_{i + 1}.csv");
            finalAvgPerDay[i] = calculateAvgValuePerHour(currentFile);
        }
        string newFileName = Path.Combine(folderPath, "average_value_per_hour_per_day.csv");
        using (StreamWriter writetext = new StreamWriter(newFileName))
        {
            writetext.WriteLine("startingTime" + ',' + "average");
            for (int i = 0; i < finalAvgPerDay.Length; i++)
            {
                for (int j = 0; j < finalAvgPerDay[0].Length; j++)
                {
                    DateTime date = new DateTime(2025, 6, i + 1, j, 0, 0);
                    float sumOfAvg = finalAvgPerDay[i][j];
                    writetext.WriteLine(date.ToString() + "," + Math.Round(sumOfAvg, 1).ToString());
                }

            }

        }
    }
    public static void splitFileByDay(string filePath)
    {
        StreamWriter[] writers = new StreamWriter[30];
        string directoryPathForSplitedDocument = Path.GetDirectoryName(filePath);
        string folderPath = Path.Combine(directoryPathForSplitedDocument, "splitedFilesFromTimeSeries");//new folder for splited files at same path as file
        Directory.CreateDirectory(folderPath); //(if not exists create)

        for (int i = 1; i <= 30; i++)
        {
            string newFileName = Path.Combine(folderPath, $"split_file_by_day_{i}.csv");
            writers[i - 1] = new StreamWriter(newFileName);
        }

        using (StreamReader reader = new StreamReader(filePath))
        {
            while (!reader.EndOfStream)
            {
                var line = reader.ReadLine();
                int day = validationCheck(line);//if day=0 means not valid-do not copied
                if (day >= 1 && day <= 31)
                {
                    writers[day - 1].WriteLine(line);
                }
            }
        }

        for (int i = 0; i < 30; i++)
        {
            writers[i]?.Close();
        }
    }
    public static int validationCheck(string line)
    {
        //gets a line: timestamp+value
        //if not valid return day=0
        int day=0;
        var parts = line.Split(',');
        var time = parts[0];
        var value = parts[1];
        if (DateTime.TryParse(time, out DateTime result)){
            day = result.Day;
        }
        else{
            day = 0;
        }
        if (!float.TryParse(value, out float answer) || float.IsNaN(answer)){
            day = 0;
        }
        return day;
    }
    public static float[] calculateAvgValuePerHour(string currentFile)
    {
        (float,int) [] avgArray = new (float, int)[24];
        using (var reader = new StreamReader(currentFile))
        {
            while (!reader.EndOfStream)
            {
                var lineParts = reader.ReadLine().Split(',');
                int hour = DateTime.Parse(lineParts[0]).Hour;
                float value = float.Parse(lineParts[1]);
                avgArray[hour].Item1 += value;//Item1:sum of value
                avgArray[hour].Item2++;//Item2:sum of values calculated
            }
        }
        float[] finalAvg = new float[24];
        
        for (int i = 0; i < avgArray.Length; i++)//calculate avg
        {
            if (avgArray[i].Item2 != 0)
            {
                finalAvg[i] = avgArray[i].Item1 / avgArray[i].Item2;
            }
        }
        return finalAvg;
    }
   
    public static async Task ReadParquetFile(string filePath)
    {
        //מאחר והקובץ הגיע כבר עם ממוצע לשעה 
        //קראתי את העמודות הרלוונטיות- היו עוד עמודות 
        //וייצאתי  אותם לקובץ CSV
        string directoryPath = Path.GetDirectoryName(filePath);
        string newFilePath = Path.Combine(directoryPath, "avg_value_from_parqet_file.csv");
           

        using (ParquetReader parquetReader = await ParquetReader.CreateAsync(filePath))
        {
            ParquetSchema schema = parquetReader.Schema;
            Field[] neededFeild = new Field[2];
            List<string>[] storedData = new List<string>[2]; 
            for (int i = 0; i < storedData.Length; i++)
            {
                storedData[i] = new List<string> { };
            }
            for (int index = 0; index < neededFeild.Length; index++)//needed feild:only 2 first columns
            {
                neededFeild[index]= schema[index];
                

            }
            using(StreamWriter writer =new StreamWriter(newFilePath)){

                for (int i = 0; i < parquetReader.RowGroupCount; i++)
                {
                    using (ParquetRowGroupReader groupReader = parquetReader.OpenRowGroupReader(i))
                    {
                        int index = 0;
                        foreach (DataField field in neededFeild)
                        {
                            Parquet.Data.DataColumn column = await groupReader.ReadColumnAsync(field);
                           
                               
                            foreach (var value in column.Data)
                            {
                                
                                storedData[index].Add(value.ToString());
                                
                            }
                            index++;
                        }
                    }
                }
                writer.WriteLine(neededFeild[0].Name.ToString() + ',' + neededFeild[1].Name.ToString());
                for (int i = 0; i < storedData[0].Count; i++)
                {
                    writer.WriteLine(storedData[0][i].ToString()+','+ storedData[1][i].ToString());
                }

            }
        }
    }

}




