<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope {{> _namespaces}}>
    <SOAP-ENV:Header>
        {{> _passport }}
    </SOAP-ENV:Header>
    <SOAP-ENV:Body>
        <nsmessages:getDataCenterUrls>
            <nsmessages:account>{{credentials.account}}</nsmessages:account>
        </nsmessages:getDataCenterUrls>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>