import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface EmailTemplateProps {
    res: any
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const EmailTemplate = ({
    res
  }: EmailTemplateProps) => {
    const formattedDate = new Intl.DateTimeFormat("en", {
      dateStyle: "long",
      timeStyle: "short",
    }).format();
  
    return (
      <Html>
        <Head />
        <Preview>Yelp recent login</Preview>
        <Body style={main}>
          <Container>
            <Section style={logo}>
              <Img width={120} height={100} src='https://image.similarpng.com/very-thumbnail/2020/11/Share-icon-with-red-color-on-transparent-background-PNG.png' />
            </Section>
  
            <Section style={content}>
              <Row>
                <Img
                  style={image}
                  width={620}
                  src='https://graphicsfamily.com/wp-content/uploads/edd/2021/01/Web-banner-template-with-sports-concept-scaled.jpg'
                />
              </Row>
  
              <Row style={{ ...boxInfos, paddingBottom: "0" }}>
                <Column>
                  <Heading
                    style={{
                      fontSize: 32,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Hi {res.userName},
                  </Heading>
                  <Heading
                    as="h2"
                    style={{
                      fontSize: 26,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    A file has been shared with you
                  </Heading>
  
                  <Text style={paragraph}>
                    <b>Filename: </b>
                    {res.filename}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Format: </b>
                    {res.type}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Size: </b>
                    {res.size}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Password: </b>
                    {res.password}
                  </Text>
  
                </Column>
              </Row>
              <Row style={{ ...boxInfos, paddingTop: "0" }}>
                <Column style={containerButton} colSpan={2}>
                  <a href={res.shareUrl} style={button}>Learn More</a>
                </Column>
              </Row>
            </Section>
  
            <Section style={containerImageFooter}>
              <Img
                style={image}
                width={220}
                src='https://image.similarpng.com/very-thumbnail/2020/11/Share-icon-with-red-color-on-transparent-background-PNG.png'
              />
            </Section>
  
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "rgb(0,0,0, 0.7)",
              }}
            >
              © 2024 | ShareKaro.,
              INDIA | www.sharekaro.com
            </Text>
          </Container>
        </Body>
      </Html>
    );
  };
  
  export default EmailTemplate;
  
  const main = {
    backgroundColor: "#fff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const paragraph = {
    fontSize: 16,
  };
  
  const logo = {
    padding: "30px 20px",
  };
  
  const containerButton = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };
  
  const button = {
    backgroundColor: "#e00707",
    borderRadius: 3,
    color: "#FFF",
    fontWeight: "bold",
    border: "1px solid rgb(0,0,0, 0.1)",
    cursor: "pointer",
    padding: "12px 30px",
  };
  
  const content = {
    border: "1px solid rgb(0,0,0, 0.1)",
    borderRadius: "3px",
    overflow: "hidden",
  };
  
  const image = {
    maxWidth: "100%",
  };
  
  const boxInfos = {
    padding: "20px",
  };
  
  const containerImageFooter = {
    padding: "45px 0 0 0",
  };
  