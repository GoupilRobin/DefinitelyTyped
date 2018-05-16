import Dicer, { DicerConfig, PartStream } from "dicer";

import fs = require("fs");
import stream = require("stream");

function testDicerSyntax() {
    const opts: DicerConfig = {
        boundary: "testing",
    };
    const dicer = new Dicer(opts);

    dicer.setBoundary("new-testing-boundary");

    dicer.on("part", handleDicerPartStream);

    dicer.on("finish", () => {
        console.log("dicer parsing finished");
    });

    dicer.on("preamble", (part) => {
        console.log("dicer preamble to new part");
    });

    dicer.on("trailer", (data) => {
        console.log(`dicer trailing data found: ${data.length} bytes`);
    });

    dicer.on("close", () => {
        console.log("dicer close");
    });

    dicer.on("drain", () => {
        console.log("dicer drain");
    });

    dicer.on("error", (err) => {
        console.error(`dicer error: ${err.message || JSON.stringify(err)}`);
    });

    dicer.on("finish", () => {
        console.log("dicer finish");
    });

    dicer.on("pipe", (src: stream.Readable) => {
        console.log("dicer pipe");
    });

    dicer.on("unpipe", (src: stream.Readable) => {
        console.log("dicer unpipe");
    });

    const inputFileStream = fs.createReadStream("in-test-file.txt");

    inputFileStream.pipe(dicer);
}

/**
 * Handle a part found by a Dicer parser
 *
 * @param part Part found
 */
function handleDicerPartStream(part: PartStream) {
    console.log("dicer part found");

    const outputFileStream = fs.createWriteStream("out-test-file.txt");

    part.on("readable", () => {
        console.log("part readable");
    });

    part.on("header", (header) => {
        console.log(`part header found:\n${JSON.stringify(header)}`);
    });

    part.on("data", () => {
        console.log("part data");
    });

    part.on("finish", () => {
        console.log("part finished");
    });

    part.on("error", (err) => {
        console.error(`part error: ${err.message || JSON.stringify(err)}`);
    });

    part.on("end", () => {
        console.log("part ended");
    });

    part.on("close", () => {
        console.log("part closed");
    });

    part.pipe(outputFileStream);
}
