import { useState } from "react";
import { Button } from "@headlessui/react";
import placeHolderForImage from "../assets/sliders/1.jpg";
import { FaPhone } from "react-icons/fa";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted:", form);
        setForm({
            name: "",
            email: "",
            message: ""
        });
    };

    return (
        <div>
            Contact us
            {/*background image: */}
            <img 
                src={placeHolderForImage}
                alt="Contact"
            />

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name
                    </label>
                    <input 
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <label>
                        Email
                    </label>
                    <input 
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <label>
                        Message
                    </label>
                    <input 
                        type="text"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                    />

                    <Button type="submit">
                        Submit
                    </Button>

                    <div>
                        <h2>Contact information</h2>
                        <FaPhone />
                        <h3>phone number: 050-1234567</h3>
                        <h3>Email: lior@gmail.com</h3>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Contact;
