import { useRequest } from 'providers/ApiProvider';
import { VideoProps } from './VideoTypes';

export default function VideoView({ video: { path, name, folderPath, createdAt, modifiedAt }, folder, isTable, ...props }: VideoProps) {
    const [game, friendGroup] = folder.path.split('/').reverse();
    const requestPlayVideo = useRequest();
    const requestOpenFolder = useRequest();

    return isTable ? (
        <tr className='video' key={path} {...props}>
            <td aria-label="name">{name}</td>
            <td aria-label="folder-path">{folderPath}</td>
            <td aria-label="created-at">{createdAt.toLocaleDateString()}</td>
            <td aria-label="modified-at">{modifiedAt.toLocaleDateString()}</td>
            <td className="button-container">
                <button onClick={() => requestPlayVideo(
                    `/medal/${friendGroup}/${game}/play?path=${path}`,
                )}>Play</button>
                <button onClick={() => requestOpenFolder(
                    `/medal/${friendGroup}/${game}/open?path=${folderPath}`
                )}>Open Folder</button>
            </td>
        </tr>
    ) : (
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
                    <button onClick={() => requestPlayVideo(
                        `/medal/${friendGroup}/${game}/play?path=${path}`,
                    )}>Play</button>
                    <button onClick={() => requestOpenFolder(
                        `/medal/${friendGroup}/${game}/open?path=${folderPath}`
                    )}>Open Folder</button>
                </div>
            </footer>
        </article>
    )
}