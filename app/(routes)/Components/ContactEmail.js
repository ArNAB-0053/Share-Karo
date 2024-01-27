"use client";
import { useState } from "react";
import { db, storage } from "../../../firebase";
import "../../../styles/contactemail.css";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";

const ContactEmail = () => {
    // Add a new document with a generated id.
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [desc, setDesc] = useState();
    const [files, setFiles] = useState()

    const { user } = useUser();

    const handleUpload = async () => {
        const notify = toast.loading("Sending...");
        const docRef = await addDoc(collection(db, "contact"), {
            userId: user.id,
            name: name,
            email: email,
            description: desc,
        });

        setFiles(docRef)
        console.log(files)

        if (docRef !== null) {
            toast.success("Sent!", { id: notify });
        } else {
            toast.error("Failed to send email!", { id: notify });
        }

        setDesc('')
        setEmail('')
        setName('')

    };

    return (
        <div className="container flex items-center justify-center mt-[-10vh]">
            <div className="card">
                <a className="singup">Contact</a>
                <div className="inputBox1">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            // console.log(e.target.value)
                            setName(e.target.value);
                        }}
                        required
                    />
                    <span className="user">Name</span>
                </div>

                <div className="inputBox2">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => {
                            // console.log(e.target.value)
                            setEmail(e.target.value);
                        }}
                        required
                    />
                    <span>Email</span>
                </div>

                <div className="inputBox desc">
                    <textarea
                        type="text"
                        value={desc}
                        onChange={(e) => {
                            // console.log(e.target.value)
                            setDesc(e.target.value);
                        }}
                        required
                    />
                    <span>Description</span>
                </div>

                <button className="enter" onClick={handleUpload} disabled={!name || !email || !desc}>
                    Send
                </button>

            </div>
            <Toaster position="top-right" />
        </div>
    );
};

export default ContactEmail;
