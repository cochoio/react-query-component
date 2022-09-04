import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useImperativeHandle, useRef } from "react";

export type QueryProps<T, Error = any> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<T>;
  options?: Omit<
    UseQueryOptions<T, Error, T>,
    "queryKey" | "queryFn" | "initialData"
  >;
  innerRef?: UseQueryResult<T, Error>;
  children: (props: UseQueryResult<T, Error>) => JSX.Element;
};

export default function Query<T, Error = any>(props: QueryProps<T>) {
  const { children, queryKey, queryFn, innerRef, options } = props;

  const ref = useRef(innerRef);

  const query = useQuery<T, Error, T>(queryKey, queryFn, options);

  useImperativeHandle(ref, () => query);

  return children({ ...query });
}
