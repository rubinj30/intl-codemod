import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <StackLayout gap={4}>
        <Heading
          level={1}
          appearance={isPhone ? "heading-2" : "heading-1"}
          id="exitModalTitle"
        >
          Taking a break?
        </Heading>
        <Text appearance={isPhone ? "medium" : "large"}>
          You’re so close! We will save your progress so you can come back and
          finish later.
        </Text>
      </StackLayout>
    </div>
  );
}

export default MyApp;
