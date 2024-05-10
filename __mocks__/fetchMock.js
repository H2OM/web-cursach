export default function settingFetchResult (val){ 
    global.fetch = jest.fn().mockResolvedValue({
    // json: jest.fn().mockResolvedValue(val),
    ok: true,
    json: () => (val)
})};   
