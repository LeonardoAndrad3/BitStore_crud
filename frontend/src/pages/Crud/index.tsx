import React from 'react';
import {Crud} from "../../components/Crud";
import {useRouter} from "next/router";
import './index.css';
import { useSearchParams } from 'react-router-dom';

export function PageCrud(){

    const [search, setSearch] = useSearchParams();

    return(
        <>
            <div className="main">
                <Crud type={[search.get("type")]}/>
            </div>
        </>
    );
}
