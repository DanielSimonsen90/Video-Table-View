import { VideoComponentProps } from "../../VideoTypes";

export default function VideoCard({ 
    video: { path, name, folderPath, createdAt, modifiedAt }, 
    friendGroup, game,
    requestPlayVideo, requestOpenFolder,
    ...props 
}: VideoComponentProps) {
    return (
        <article className='video' key={path} {...props}>
            <header>
                <h2 aria-label="name">{name}</h2>
            </header>
            <section>
                <p aria-label="folder-path">{folderPath}</p>
            </section>
            <footer>
                <div className="dates">
                    <p aria-label="created-at">
                        <span>Created: </span>{createdAt.toLocaleDateString()}
                    </p>
                    <p aria-label="modified-at">
                        <span>Modified: </span>{modifiedAt.toLocaleDateString()}
                    </p>
                </div>
                <div className="button-container">
                    <button onClick={requestPlayVideo}>Play</button>
                    <button onClick={requestOpenFolder}>Open Folder</button>
                </div>
            </footer>
        </article>
    )
}