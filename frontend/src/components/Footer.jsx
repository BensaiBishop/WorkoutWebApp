
const date = new Date();
const year = date.getFullYear();

export default function Footer() {
    return (
        <footer className="flex justify-center bg-black opacity-30 static w-full p-4">
        <p> {year} Routinely</p>
        </footer>
    );
}