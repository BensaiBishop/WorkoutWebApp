
const date = new Date();
const year = date.getFullYear();

export default function Footer() {
    return (
        <footer className="flex justify-center bg-black opacity-30">
        <p> {year} Routinely</p>
        </footer>
    );
}