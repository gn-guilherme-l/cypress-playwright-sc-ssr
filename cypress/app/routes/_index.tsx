import type { MetaFunction } from "@remix-run/node";
import styled from "styled-components";

export const meta: MetaFunction = () => {
  return [
    { title: "Test" },
    { name: "description", content: "Test" },
  ];
};

const Layout = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.fg};
`;

export default function Index() {
  return (
    <Layout>
      <Box />
    </Layout>
  );
}
