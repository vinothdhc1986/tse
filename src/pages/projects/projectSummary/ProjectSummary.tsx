import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjectSummaryData } from './projectSummarySlice';
import Props from './typing';
import VerticalTab from "../../../app/components/verticalTab/VerticalTab";
import './styles.scss';
import { RootState } from "../../../app/store";
import Loader from "../../../app/components/loader/loader";


const ProjectSummary: FC<Props> = (props): JSX.Element => {
    const dispatch = useDispatch();
    const { isLoading, error, projectSummary } = useSelector((state: RootState) => state.projectSummary);
    useEffect(() => {
        dispatch(fetchProjectSummaryData());
    }, []);
    return (<>
        {isLoading ?
            <Loader /> :
            <VerticalTab data={projectSummary} />
        }
    </>)
}

export default ProjectSummary;