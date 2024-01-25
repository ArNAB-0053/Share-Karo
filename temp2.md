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
  res: any;
}

const baseUrl = ''

export const EmailTemplate = ({ res }: EmailTemplateProps) => {
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
            <Img style={image} width={620} src='https://firebasestorage.googleapis.com/v0/b/sharekaro-f7a3d.appspot.com/o/only_logo.png?alt=media&token=f80848f5-dd14-4dd3-8810-d7567de874a2' />
          </Section>

          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                src="https://firebasestorage.googleapis.com/v0/b/sharekaro-f7a3d.appspot.com/o/banner.png?alt=media&token=9ccc0743-e1b2-4f5f-ae79-0bb4b0164478"
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
                  Hi {res.userName.split(' ')[0]},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  You've Received a File
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
                {/* <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Password: </b>
                    {res.password}
                  </Text> */}
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <a href={res.shareUrl} style={button}>
                  Download
                </a>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src='https://firebasestorage.googleapis.com/v0/b/sharekaro-f7a3d.appspot.com/o/logo.png?alt=media&token=f1fc56e6-1533-4caa-8057-abb9eb6ca48a'
            />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2024 | ShareKaro., INDIA | www.sharekaro.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;

const main = {
  backgroundColor: "",
  fontFamily:
    'Montserrat,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
  height: "8rem"
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
  width: "10rem",
  height: "4rem"
};
