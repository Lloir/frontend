import Papa from 'papaparse';

export const loadCsvData = async (url) => {
    const response = await fetch(url);
    const csvData = await response.text();
    return new Promise((resolve, reject) => {
        Papa.parse(csvData, {
            header: true,
            complete: (results) => resolve(results.data),
            error: (error) => reject(error),
        });
    });
};
