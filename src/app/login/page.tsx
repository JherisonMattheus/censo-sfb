import LoginForm from "@/components/LoginForm";

export default function Login(){
    return (
        <main className="flex items-center justify-center flex-1 bg-blue-300">
            <div className="flex min-w-80 w-full max-w-128  flex-col items-center rounded-sm p-8 bg-white text-black">
                <h2 className="pt-2 pb-6 font-bold text-2xl">
                    Login
                </h2>
                <LoginForm/>
            </div>
        </main>
    )
}