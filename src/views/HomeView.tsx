import Header from "../components/Header";

function HomeView() {
    return (
        <>
            <Header />
            <main className="bg-gray-100 py-0 main-h-screen">
                <div className="max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-10 lg:px-0 space-y-6">
                        <h1 className="text-6xl font-black">
                            All you <span className="text-cyan-400">Social Networsks </span>
                            in one place
                        </h1>
                        <p className="text-slate-800 text-xl">
                            Join thousands of users who are using DevTree to share their social networks, share you
                            profile of Tiktok, Instagram, Twitter, Linkedin, Facebook, Youtube, Github and more.
                        </p>
                    </div>
                </div>
            </main>

        </>
    );
}

export default HomeView;