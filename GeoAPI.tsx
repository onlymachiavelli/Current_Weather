const DetectGeo = async () => {
    const Request = await fetch("http://ip-api.com/json")
    const Response = await Request.json()
    return Response
}
export default DetectGeo
