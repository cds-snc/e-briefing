import { environment } from "src/environments/environment";
import { FileTransferObject } from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";

interface EndPoint {
  url: string;
  token: string;
}

const asyncForEach = async (
  array: [],
  callback: (arr: [], index: number, array: []) => {}
) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const getTripEndPoint = async (path: string): Promise<EndPoint> => {
  return {
    url: `${environment.api_url}/trips/${environment.trip_id}/${path}`,
    token: environment.api_key
  };
};

const fetchTripEndpoint = async (path: string): Promise<Response> => {
  const endPoint = await getTripEndPoint(path);
  const response = await fetch(endPoint.url, {
    headers: {
      Authorization: `Bearer ${endPoint.token}`
    }
  });

  return response;
};

const getFileList = async (): Promise<[]> => {
  const response = await fetchTripEndpoint("file_list");
  const files = await response.json();
  return files;
};

export const syncSingleFiles = async (): Promise<void> => {
  
  // get a list of files we want to download
  const files = await getFileList();

  // get device storage directory
  const file = new File();
  const storageDir = file.dataDirectory;

  // download files
  await asyncForEach(files, async fileName => {
    const fileTransfer = new FileTransferObject();
    const endPoint = await getTripEndPoint(`get_file?file_path=${fileName}`);
    const uri = encodeURI(endPoint.url);
    const fileUrl = `${storageDir}/${fileName}`;

    try {
      await fileTransfer.download(uri, fileUrl, false, {
        headers: {
          Authorization: `Bearer ${endPoint.token}`
        }
      });
    } catch (e) {
      console.log(`fileTransfer failed ${e.message}`);
    }
  });
};
