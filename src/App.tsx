import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AppBar from './AppBar';

function MainContainer() {
  const [isOpen, setOpen] = useState(false);
  const [isSent, setSent] = useState(false);
  const [fromMain, setFromMain] = useState<string | null>(null);

  const handleToggle = () => {
    if (isOpen) {
      setOpen(false);
      setSent(false);
    } else {
      setOpen(true);
      setFromMain(null);
    }
  };
  const sendMessageToElectron = () => {
    if (window.Main) {
      window.Main.sendMessage("Hello I'm from React World");
    } else {
      setFromMain('You are in a Browser, so no Electron functions are available');
    }
    setSent(true);
  };

  useEffect(() => {
    if (isSent && window.Main)
      window.Main.on('message', (message: string) => {
        setFromMain(message);
      });
  }, [fromMain, isSent]);

  // 初期表示時に log-files-dir を取得する
  const [logFilesDir, setlogFilesDir] = useState<string | null>(null);
  const [logFileNames, setlogFileNames] = useState<string[] | null>(null);
  useEffect(() => {
    if (window.Main) {
      window.Main.on('log-files-dir', (dir: string) => {
        console.log(dir);
        setlogFilesDir(dir);
      });
      window.Main.on('log-file-names', (names: string[]) => {
        console.log(names);
        setlogFileNames(names);
      });
    }
  }, []);

  useEffect(() => {
    if (window.Main)
      window.Main.on('file-content', (content: string) => {
        console.log(content);
      });
  });

  const [joinWorldLogLines, setJoinWorldLogLines] = useState<string[]>([]);
  useEffect(() => {
    if (window.Main) {
      window.Main.on('join-world-log-lines', (lines: string[]) => {
        console.log(lines);
        setJoinWorldLogLines(lines);
      });
    }
  }, []);

  const [vrchatPhotoDir, setVrchatPhotoDir] = useState<string | null>(null);
  useEffect(() => {
    if (window.Main) {
      window.Main.on('vrchat-photo-dir', (dir: string) => {
        console.log(dir);
        setVrchatPhotoDir(dir);
      });
    }
  }, []);

  useEffect(() => {
    if (window.Main)
      window.Main.on('toast', (content: string) => {
        console.log(content);
        toast(content);
      });
  });
  return (
    <div className="flex-auto">
      <Toaster />
      <div className=" flex flex-col justify-center items-center h-full bg-gray-800 space-y-4">
        <h1 className="text-2xl text-gray-200">Vite + React + Typescript + Electron + Tailwind</h1>
        <button
          className="bg-yellow-400 py-2 px-4 rounded focus:outline-none shadow hover:bg-yellow-200"
          onClick={handleToggle}
        >
          Click Me
        </button>
        {isOpen && (
          <div className="flex flex-col space-y-4 items-center">
            <div className="flex space-x-3">
              <h1 className="text-xl text-gray-50">💝 Welcome 💝, now send a message to the Main 📩📩</h1>
              <button
                onClick={sendMessageToElectron}
                className=" bg-green-400 rounded px-4 py-0 focus:outline-none hover:bg-green-300"
              >
                Send
              </button>
            </div>
            {isSent && (
              <div>
                <h4 className=" text-green-500">Message sent!!</h4>
              </div>
            )}
            {fromMain && (
              <div>
                {' '}
                <h4 className=" text-yellow-200">{fromMain}</h4>
              </div>
            )}
          </div>
        )}
        <button
          className="open-dialog-and-set-log-files-dir-button py-2 px-4 bg-white rounded focus:outline-none shadow hover:bg-yellow-200"
          onClick={() => {
            if (window.Main) {
              window.Main.openDialogAndSetLogFilesDir();
            }
          }}
        >
          openDialogAndSetLogFilesDir
        </button>
        <button
          className="get-log-files-dir-button py-2 px-4 bg-white rounded focus:outline-none shadow hover:bg-yellow-200"
          onClick={() => {
            if (window.Main) {
              window.Main.getLogFilesDir();
            }
          }}
        >
          getLogFilesDir
        </button>
        <div className="log-files-dir-label">log-files-dir: {logFilesDir}</div>
        <div className="log-file-names-label">log-file-names: {logFileNames?.join(',')}</div>
        <div className="join-world-log-lines-label">
          join-world-log-lines:
          {joinWorldLogLines.map((line) => {
            return <div key={line}>{line}</div>;
          })}
        </div>
        {/* VRChat Photo の Dir を指定する */}
        <button
          className="open-dialog-and-set-vrchat-photo-dir-button py-2 px-4 bg-white rounded focus:outline-none shadow hover:bg-yellow-200"
          onClick={() => {
            if (window.Main) {
              window.Main.openDialogAndSetVRChatPhotoDir();
            }
          }}
        >
          openDialogAndSetVRChatPhotoDir
        </button>
        <div className="vrchat-photo-dir-label">vrchat-photo-dir: {vrchatPhotoDir}</div>
        {/* ファイル生成ボタン */}
        <button
          className="create-file-button py-2 px-4 bg-white rounded focus:outline-none shadow hover:bg-yellow-200"
          onClick={() => {
            if (window.Main) {
              window.Main.createFiles();
            }
          }}
        >
          createFile
        </button>
      </div>
    </div>
  );
}

function App() {
  console.log(window.ipcRenderer);

  const [isOpen, setOpen] = useState(false);

  const [showAppBar, setShowAppBar] = useState(false);
  // window.Main を監視する
  // useEffect(() => {
  //   if (window.Main) {
  //     setShowAppBar(true);
  //   }
  // }, []);

  return (
    <div className="flex flex-col h-screen">
      {showAppBar && <AppBar />}
      <button
        className="bg-red-400 py-2 px-4 rounded focus:outline-none shadow hover:bg-red-200"
        onClick={() => setOpen(!isOpen)}
      >
        Toggle
      </button>

      {isOpen && <MainContainer />}
    </div>
  );
}

export default App;
