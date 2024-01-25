import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  res: any;
}

export const EmailTemplate = ({ res }: EmailTemplateProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
  }).format();

  return (
    <Html>
      <Head />
      <Preview>File share via sharekaro</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://firebasestorage.googleapis.com/v0/b/sharekaro-f7a3d.appspot.com/o/only_logo.png?alt=media&token=f80848f5-dd14-4dd3-8810-d7567de874a2"
            width={70}
            height={48}
            alt="sharekaro"
          />
          <Heading style={heading}>🪄 Hi, {res.userName.split(' ')[0]}</Heading>
          <Text style={paragraph}>
              You've received a file
            </Text>
          <Section style={body}>
            <Text style={paragraph}>
              <strong>Filename</strong>: {res.filename}
            </Text>
            <Text style={paragraph}>
              <strong>Filename</strong>: {res.type}
            </Text>
            <Text style={paragraph}>
              <strong>Filename</strong>: {res.size}
            </Text>
            <Text style={paragraph}>
              <Link style={{...link, textAlign: "center"}} href={res.shareUrl}>
                Download
              </Link>
            </Text>
            <Text style={paragraph}>
              If you don't recognize the sender, please ignore this email.
            </Text>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />- sharekaro
          </Text>
          <Hr style={hr} />
          <Link href="https://share-karo.vercel.app/" style={footer}>
            <Img
              src="https://firebasestorage.googleapis.com/v0/b/sharekaro-f7a3d.appspot.com/o/logo.png?alt=media&token=f1fc56e6-1533-4caa-8057-abb9eb6ca48a"
              width={170}
              height={40}
            />
          </Link>
          <Text style={footer}>
            2024 India || © sharekaro. All rights reserved
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#fff",
  backgroundColor: "#FF0000",
  width: "4.5rem",
  padding:"0.2rem 1rem",
  display:"flex",
  justifyContent:"center",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
