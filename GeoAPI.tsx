const DetectGeo = async () => {
    const Response = await fetch("https://api.myip.com/").then((Response) =>Response.json())
    return String(Response.country)
}
export default DetectGeo