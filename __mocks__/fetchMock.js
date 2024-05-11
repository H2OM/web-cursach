export default function settingFetchResult (val, callback = false){ 
   
    global.fetch = jest.fn((recived, {method, body = false, cache = false}) => {
        let result = callback ? callback(recived) : val;
        
        return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(result)

    })});
    
};   
