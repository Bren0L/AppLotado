const fetchLocation = async() => {
    const res = await fetch("http://192.168.1.13:3000/");
    const locations = await res.json();

    return locations;
}

module.exports = {
    fetchLocation
}
