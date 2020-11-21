import { useEffect, useState } from "react";
import { Option } from "../typings";
import { API_HOST } from "./../Contants";

type MasterDataType = {
  list: Option[];
  loaded: boolean;
};

type MasterData = {
  manufacturers: MasterDataType;
  colors: MasterDataType;
};

export type MasterDataKey = keyof MasterData;

export const MASTER_DATA_COLORS: MasterDataKey = "colors";
export const MASTER_DATA_MANUFACTURERS: MasterDataKey = "manufacturers";

type ColorResponse = {
  colors: string[];
};

type Manufacturer = {
  name: string;
  models: Array<{ name: string }>;
};

type ManufacturersResponse = {
  manufacturers: Manufacturer[];
};

const masterData: MasterData = {
  manufacturers: {
    list: [],
    loaded: false,
  },
  colors: {
    list: [],
    loaded: false,
  },
};

const transformColors = (resp: ColorResponse): Option[] => {
  return resp.colors.map((color: string) => ({
    value: color,
    label: color,
  }));
};

const transformManufacturers = (resp: ManufacturersResponse): Option[] => {
  return resp.manufacturers.map((manufacturer: Manufacturer) => ({
    value: manufacturer.name,
    label: manufacturer.name,
  }));
};

const fetchMasterData = (key: MasterDataKey) => {
  return fetch(`${API_HOST}/${key}`)
    .then((resp: Response) => resp.json())
    .then((resp: ColorResponse | ManufacturersResponse) => {
      let list: Option[] = [];
      if (key === MASTER_DATA_COLORS) {
        list = transformColors(resp as ColorResponse);
      } else if (key === MASTER_DATA_MANUFACTURERS) {
        list = transformManufacturers(resp as ManufacturersResponse);
      }
      return list;
    });
};

const useMasterData = (key: MasterDataKey) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (masterData[key].loaded) {
      setOptions(masterData[key].list);
    } else {
      fetchMasterData(key).then((list: Option[]) => {
        masterData[key] = {
          list,
          loaded: true,
        };
        setOptions(list);
      });
    }
  }, [key]);

  return {
    options,
  };
};

export default useMasterData;
