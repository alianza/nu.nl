export default function Footer(props) {
    return <footer className="absolute w-full bottom-0 h-16 p-4 shadow-allround flex justify-between items-center">
            <span>Author: <a href="https://jwvbremen.nl" target="_blank"
                             rel="noreferrer">Jan-Willem van Bremen</a></span>
        <span>{new Date(props.buildTime).toLocaleString("nl")}</span>
    </footer>
}
