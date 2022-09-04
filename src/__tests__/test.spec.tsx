/**
 * @jest-environment jsdom
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, waitFor, screen, act } from "@testing-library/react";
import { useMemo } from "react";
import Query from "../react-query-component";

function WrapperProvider({ children }: any) {
  const client = useMemo(() => new QueryClient(), []);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

type MockData = {
  id: number;
  name: string;
};

async function sleep(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

async function callApi(): Promise<MockData> {
  await sleep();
  return new Promise<MockData>((resolve) => {
    resolve({
      id: 1,
      name: "test",
    });
  });
}

function TestingComponent() {
  return (
    <Query<MockData> queryFn={callApi} queryKey={["api-key"]}>
      {({ data, isFetching }) => {
        if (!data && isFetching) {
          return <p>Loading...</p>;
        }

        if (!data) {
          return <div>Data Is Not Found</div>;
        }

        return (
          <div>
            {data.id} {data.name}
          </div>
        );
      }}
    </Query>
  );
}

test("should work as expected", async () => {
  render(<TestingComponent />, {
    wrapper: WrapperProvider,
  });

  await screen.findByText(/Loading/i);
  await act(() => sleep());
  await screen.findByText(/test/i);
});
