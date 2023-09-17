function testThis(username: string): string {
    console.log(username);
    const user = { name: "test",
                                                                                                                                                                                                                age: 12,
    };
    const name = user["name"];

    return username + name;
}
testThis("test");
