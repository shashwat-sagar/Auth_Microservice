function testThis(username: string): string {
    // console.log(username);
    const user = { nae: "test", age: 12 };
    const name = user.nae;

    return username + name;
}
testThis("test");
