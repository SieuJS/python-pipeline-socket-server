// Raw data input as a string
let rawData = `
1;21100922606;"Lancet Digital Health The";journal;"25897500";7;277;Q1;66;133;394;5304;193;13;67;26;97;43;73;0;55;United Kingdom;Western Europe;"Elsevier Ltd";"2019-2023";"Decision Sciences (miscellaneous) (Q1); Health Informatics (Q1); Health Information Management (Q1); Medicine (miscellaneous) (Q1)";"Decision Sciences; Health Professions; Medicine"
2;24721;"Annals of Mathematics";journal;"0003486X";7;154;Q1;137;32;98;1423;588;98;5;64;44;47;11;25;0;0;United States;Northern America;"Department of Mathematics at Princeton University";"1996-2023";"Mathematics (miscellaneous) (Q1); Statistics and Probability (Q1); Statistics Probability and Uncertainty (Q1)";"Decision Sciences; Mathematics"
3;22330;"Organizational Research Methods";journal;"15527425";6;712;Q1;138;48;90;4280;1195;87;13;80;89;17;30;08;1;2;United States;Northern America;"SAGE Publications Inc.";"1998-2023";"Decision Sciences (miscellaneous) (Q1); Management of Technology and Innovation (Q1); Strategy and Management (Q1)";"Business; Management and Accounting; Decision Sciences"
4;15631;"International Journal of Information Management";journal;"02684012";5;775;Q1;177;95;464;9818;13119;450;24;28;103;35;28;01;3;17;United Kingdom;Western Europe;"Elsevier Ltd";"1970;1986-2024";"Artificial Intelligence (Q1); Computer Networks and Communications (Q1); Information Systems (Q1); Information Systems and Management (Q1); Library and Information Sciences (Q1); Management Information Systems (Q1); Marketing (Q1)";"Business; Management and Accounting; Computer Science; Decision Sciences; Social Sciences"
5;21789;"Manufacturing and Service Operations Management";journal;"15265498";5;466;Q1;110;167;362;7813;2582;359;5;36;46;78;27;79;3;50;United States;Northern America;"INFORMS Institute for Operations Research and the Management Sciences";"1999-2023";"Management Science and Operations Research (Q1); Strategy and Management (Q1)";"Business; Management and Accounting; Decision Sciences"
6;21307;"Management Science";journal;"00251909";5;438;Q1;290;388;1125;21282;7257;1118;5;57;54;85;23;40;46;104;United States;Northern America;"INFORMS Institute for Operations Research and the Management Sciences";"1969-2023";"Management Science and Operations Research (Q1); Strategy and Management (Q1)";"Business; Management and Accounting; Decision Sciences"
7;13649;"Annals of Statistics";journal;"00905364";5;335;Q1;192;97;446;5170;2128;442;3;72;53;30;21;15;0;1;United States;Northern America;"Institute of Mathematical Statistics";"1996-2023";"Statistics and Probability (Q1); Statistics Probability and Uncertainty (Q1)";"Decision Sciences; Mathematics"
`;

// Split the data into rows
let rows = rawData.trim().split('\n');

// Prepare the headers (adjust as necessary)
let headers = [
    'Rank', 'Sourceid', 'Title', 'Type', 'ISSN', 'SJR', 'SJR Best Quartile', 'H index', 
    'Total Docs (2023)', 'Total Docs (3 years)', 'Total Refs', 'Total Cites (3 years)', 
    'Citable Docs (3 years)', 'Cites / Doc (2 years)', 'Ref / Doc', '%Female', 'Overton', 
    'SDG', 'Country', 'Region', 'Publisher', 'Coverage', 'Categories', 'Areas'
];

// Function to format the data into CSV
function formatToCSV(dataRows) {
    // Create an array to hold the CSV formatted data
    let csvRows = [headers.join(',')];

    // Loop through each row and format it
    dataRows.forEach(row => {
        let formattedRow = row.split(';').map(field => {
            // Check if the field has a comma or needs quotes
            if (field.includes(',')) {
                return `"${field.trim()}"`;
            }
            return field.trim();
        });
        csvRows.push(formattedRow.join(','));
    });

    // Join all rows with a newline character and return the CSV string
    return csvRows.join('\n');
}

// Get the formatted CSV data
let formattedCSV = formatToCSV(rows);

// Print the formatted CSV data
console.log(formattedCSV);

// Optionally, you can save the formattedCSV string as a CSV file in a browser environment or Node.js using file systems.
