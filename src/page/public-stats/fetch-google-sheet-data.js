export const fetchGoogleSheetData = async (sheetId, apiKey, range) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const result = await response.json();

        if (!result.values || result.values.length === 0) {
            throw new Error("No data found in sheet");
        }

        const data = result.values;
        return data;
    } catch (error) {
        console.error("Error loading sheet data:", error);
        throw error;
    }
};

export const fetchSheetMetaData = async (sheetId, apiKey) => {
    const metaDataUrl = `https://www.googleapis.com/drive/v3/files/${sheetId}?fields=modifiedTime&key=${apiKey}`
    try {
        const response = await fetch(metaDataUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch metadata: ${response.status}`);
        }

        const result = await response.json();

        if (!result.modifiedTime) {
            throw new Error("No metadata found in sheet");
        }

        const data = result.modifiedTime;
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error loading sheet metadata:", error);
        throw error;
    }
};
