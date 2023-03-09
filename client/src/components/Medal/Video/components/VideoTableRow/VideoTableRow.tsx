import { VideoComponentProps } from "../../VideoTypes";

export default function VideoTableRow({
    video: { path, name, folderPath, createdAt, modifiedAt },
    friendGroup, game,
    requestPlayVideo, requestOpenFolder,
    ...props
}: VideoComponentProps) {
    return (
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
    );
}