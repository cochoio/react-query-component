# react-query-component

This is a library created to use [react-query](https://github.com/tanstack/query) as a component.

## Install

```
$ yarn add @cochoio/react-query-component
// npm install @cochoio/react-query-component
```

## Example

```jsx

type MockData = {
  id: number;
  name: string;
};

function TestingComponent() {

    return (
        <Query<MockData>
            queryKey={["api-key"]}
            queryFn={async () => {
                return {
                    id: 1,
                    name: "test",
                }
            }}
        >
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

```
