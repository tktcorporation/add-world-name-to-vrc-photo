import { dialog } from "electron";
import * as neverthrow from "neverthrow";
import * as settingStore from "./settingStore";

export const handleOpenDialogAndSetLogFilesDir = async (): Promise<
  neverthrow.Result<"canceled" | "dir_path_saved", Error>
> => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    if (result.canceled) {
      return neverthrow.ok("canceled" as const);
    }
    const dirPath = result.filePaths[0];
    settingStore.setLogFilesDir(dirPath);
    return neverthrow.ok("dir_path_saved" as const);
  } catch (err) {
    if (err instanceof Error) {
      return neverthrow.err(err);
    }
    throw err;
  }
};

export const handleOpenDialogAndSetVRChatPhotoDir = async (): Promise<
  neverthrow.Result<"canceled" | "dir_path_saved", Error>
> => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    if (result.canceled) {
      return neverthrow.ok("canceled" as const);
    }
    const dirPath = result.filePaths[0];
    settingStore.setVRChatPhotoDir(dirPath);
    return neverthrow.ok("dir_path_saved" as const);
  } catch (err) {
    if (err instanceof Error) {
      neverthrow.err(err);
    }
    throw err;
  }
};
