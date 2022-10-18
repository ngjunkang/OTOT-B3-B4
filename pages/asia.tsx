import { useQuery } from "@tanstack/react-query";
import { Spinner, Table } from "flowbite-react";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

import { AsianCountriesAxios } from "../services";

type Country = {
  name: string;
  capital: string;
  population: number;
  flagImageUrl: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
};

const TableRow = (country: Country) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {country.name}
      </Table.Cell>
      <Table.Cell>
        <Image
          src={country.flagImageUrl}
          alt={country.name}
          height={192}
          width={320}
        />
      </Table.Cell>
      <Table.Cell>{country.capital}</Table.Cell>
      <Table.Cell>{country.population}</Table.Cell>
      <Table.Cell>{country.currency.code}</Table.Cell>
    </Table.Row>
  );
};

const TableHeader = () => {
  return (
    <Table.Head>
      <Table.HeadCell>Name</Table.HeadCell>
      <Table.HeadCell>Flag</Table.HeadCell>
      <Table.HeadCell>Capital</Table.HeadCell>
      <Table.HeadCell>Population</Table.HeadCell>
      <Table.HeadCell>Currency code</Table.HeadCell>
    </Table.Head>
  );
};

const AsiaPage: NextPage = () => {
  const [isLoading, setLoading] = useState(true);
  const { data } = useQuery(
    ["contacts"],
    async (): Promise<Country[]> => {
      const res = await AsianCountriesAxios.get("/");
      return res.data;
    },
    {
      onSuccess: () => setLoading(false),
    }
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-col h-screen p-6 space-y-3">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold">Asian Countries</h1>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : data ? (
        <Table striped={true}>
          <TableHeader />
          <Table.Body className="divide-y">
            {data.map((country: Country, index: number) => {
              return <TableRow key={index} {...country} />;
            })}
          </Table.Body>
        </Table>
      ) : (
        <div className="flex items-center justify-center">
          <p>No countries found</p>
        </div>
      )}
    </div>
  );
};

export default AsiaPage;
