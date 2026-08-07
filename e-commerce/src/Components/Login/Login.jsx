import { useContext, useState } from "react";
import { StoreContext } from "../../Context/Storecontext";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";

const Login = ({ setshowlogin }) => {

    const { settoken, url } = useContext(StoreContext);

    const [currstate, setcurrState] = useState("Login");
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setdata(prev => ({ ...prev, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = url;
        newUrl += currstate === "Login"
            ? "/api/user/login"
            : "/api/user/register";

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                settoken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setshowlogin(false);
            } else {
                alert(response.data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Error occurred");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">

            <form
                onSubmit={onLogin}
                className="flex flex-col w-full max-w-md bg-white rounded-2xl gap-5 p-6 sm:p-8 shadow-lg"
            >

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        {currstate}
                    </h2>

                    <MdOutlineCancel
                        size={28}
                        onClick={() => setshowlogin(false)}
                        className="cursor-pointer"
                    />
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-3 w-full">

                    {currstate !== "Login" && (
                        <input
                            className="bg-gray-100 rounded-lg p-2 w-full outline-none text-sm sm:text-base"
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder="Enter name"
                        />
                    )}

                    <input
                        className="bg-gray-100 rounded-lg p-2 w-full outline-none text-sm sm:text-base"
                        onChange={onChangeHandler}
                        name="email"
                        value={data.email}
                        type="email"
                        placeholder="Enter email"
                    />

                    <input
                        className="bg-gray-100 rounded-lg p-2 w-full outline-none text-sm sm:text-base"
                        onChange={onChangeHandler}
                        name="password"
                        value={data.password}
                        type="password"
                        placeholder="Enter password"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 transition text-white rounded-lg py-2 w-full text-sm sm:text-base"
                >
                    {currstate === "Sign Up" ? "Create Account" : "Login"}
                </button>

                {/* Terms */}
                <div className="flex items-start gap-2 text-xs sm:text-sm">
                    <input type="checkbox" required className="mt-1 cursor-pointer" />
                    <p>By continuing, I agree to the terms & privacy policy</p>
                </div>

                {/* Switch */}
                <p className="text-center text-sm">
                    {currstate === "Login" ? (
                        <>
                            Create a new account?{" "}
                            <span
                                className="text-blue-500 cursor-pointer"
                                onClick={() => setcurrState("Sign Up")}
                            >
                                Click here
                            </span>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <span
                                className="text-blue-500 cursor-pointer"
                                onClick={() => setcurrState("Login")}
                            >
                                Login here
                            </span>
                        </>
                    )}
                </p>

            </form>
        </div>
    );
};

export default Login;