import React from "react";
import ReactSkeleton from "react-loading-skeleton";
import { Cars, Item } from "./Cars";
import { Grid } from "./styled";

const Skeleton: React.FC<{}> = () => {
  return (
    <Cars>
      <Item>
        <Grid>
          <ReactSkeleton height={80} width={100} />
          <div className="car-info">
            <div className="info">
              <ReactSkeleton height={30} width={250} />
            </div>
            <div className="info">
              <ReactSkeleton height={20} width={250} />
            </div>
            <div>
              <ReactSkeleton height={15} width={100} />
            </div>
          </div>
        </Grid>
      </Item>
    </Cars>
  );
};

export default Skeleton;
