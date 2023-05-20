import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';

const Contractforexc = ({text}) => {
    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page>
                    <Text>{text}</Text>
                </Page>
            </Document>
        </PDFViewer>
    )

}

export default Contractforexc