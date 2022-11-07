
async function dividirXML(parsed_xml: object){
    type jsonKeys = keyof typeof parsed_xml;
    var base_path = parsed_xml['ArrayOfTcCompNfse' as jsonKeys];
    type jsonKeys2 = keyof typeof base_path;


    var array_xmls: object[] = (base_path['tcCompNfse' as jsonKeys2]);
    
    return array_xmls;

}

export { dividirXML }