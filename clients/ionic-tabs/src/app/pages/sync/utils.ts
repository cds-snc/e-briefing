import { environment } from "src/environments/environment";
import { File } from "@ionic-native/file/ngx";

interface FileContent {
  file: string;
  type: string;
  buffer: any;
}

const fetchTripEndpoint = async (path: string): Promise<Response> => {
  const token = environment.api_key;
  const url = environment.api_url + `/trips/${environment.trip_id}/${path}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response;
};

const getFileList = async () => {
  const response = await fetchTripEndpoint("file_list");
  const files = await response.json();
  return files;
};

const getFileExt = (fileName: string): string => {
  return fileName.split(".").pop();
};

const getFile = async (fileName: string): Promise<Response> => {
  return fetchTripEndpoint(`get_file?file_path=${fileName}`);
};

const getFileContent = async (file: string): Promise<FileContent> => {
  const type = getFileExt(file);
  const response = await getFile(file);

  // @ts-ignore
  const buffer = await response.buffer();
  return { file, type, buffer };
};

const writeFiles = async (actions: [], ionicFile: File) => {
  const files = await Promise.all(actions);
  files.forEach((data: FileContent) => {
    console.log(`writing data.file - ${data.file}`);

    ionicFile.writeFile(this.globals.dataDirectory, data.file, data.buffer, {
      replace: true
    });
    /*
    fs.writeFile("./assets/data/" + data.file, data.buffer, e => {
      if (e) {
        console.log(e.message);
      }
    });
    */
  });
};

export const syncSingleFiles = async ionicFile => {
  const files = await getFileList();

  const actions = files.map(file => {
    return getFileContent(file);
  });

  try {
    await writeFiles(actions, ionicFile);
    console.log("ready");
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
};
