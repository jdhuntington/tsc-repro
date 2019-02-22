This project contains source files that seem to cause the TypeScript
compiler (v3.3.3) to crash.

To reproduce, clone this repo, then run the following:

    npm i
    ./node_modules/.bin/tsc --pretty --target es5 --outDir lib-commonjs --module commonjs --project "./tsconfig.json"

### Expected behavior

This is a trimmed down repro of an issue encountered in a larger
project. It is *not* expected to compile sucessfully, but should print
several error messages.

### Observed behavior

`tsc` runs for several minutes comsuming 100%. Eventually the node
process exits with this error:

    <--- Last few GCs --->
    
    [64465:0x102803200]   227795 ms: Scavenge 1369.9 (1422.5) -> 1368.9 (1422.5) MB, 1.5 / 0.0 ms  (average mu = 0.181, current mu = 0.142) allocation failure
    [64465:0x102803200]   227799 ms: Scavenge 1369.9 (1422.5) -> 1368.9 (1422.5) MB, 1.5 / 0.0 ms  (average mu = 0.181, current mu = 0.142) allocation failure
    [64465:0x102803200]   227803 ms: Scavenge 1369.9 (1422.5) -> 1368.9 (1423.0) MB, 1.5 / 0.0 ms  (average mu = 0.181, current mu = 0.142) allocation failure
    
    
    <--- JS stacktrace --->
    
    ==== JS stack trace =========================================
    
        0: ExitFrame [pc: 0x1360ab75be3d]
        1: StubFrame [pc: 0x1360ab72236e]
    Security context: 0x3c72e589e6e1 <JSObject>
        2: slice [0x3c72e5886d09](this=0x3c72e4502959 <JSArray[8]>,0)
        3: /* anonymous */(aka /* anonymous */) [0x3c72e4502a11] [/private/var/folders/dx/dq3cr7h55q98bgm8t_ypkqp40000gn/T/interactive.Y0po3Zfl/tsc-repro/node_modules/typescript/lib/tsc.js:~32890] [pc=0x1360ac240071](this=0x3c725b0026f1 <undefined>,t=0x3c7250d...
    
    FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
     1: 0x10003b125 node::Abort() [/Users/jdh/local/n/bin/node]
     2: 0x10003b32f node::OnFatalError(char const*, char const*) [/Users/jdh/local/n/bin/node]
     3: 0x1001a8e85 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [/Users/jdh/local/n/bin/node]
     4: 0x1005742a2 v8::internal::Heap::FatalProcessOutOfMemory(char const*) [/Users/jdh/local/n/bin/node]
     5: 0x100576d75 v8::internal::Heap::CheckIneffectiveMarkCompact(unsigned long, double) [/Users/jdh/local/n/bin/node]
     6: 0x100572c1f v8::internal::Heap::PerformGarbageCollection(v8::internal::GarbageCollector, v8::GCCallbackFlags) [/Users/jdh/local/n/bin/node]
     7: 0x100570df4 v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [/Users/jdh/local/n/bin/node]
     8: 0x10057d68c v8::internal::Heap::AllocateRawWithLigthRetry(int, v8::internal::AllocationSpace, v8::internal::AllocationAlignment) [/Users/jdh/local/n/bin/node]
     9: 0x10057d70f v8::internal::Heap::AllocateRawWithRetryOrFail(int, v8::internal::AllocationSpace, v8::internal::AllocationAlignment) [/Users/jdh/local/n/bin/node]
    10: 0x10054d054 v8::internal::Factory::NewFillerObject(int, bool, v8::internal::AllocationSpace) [/Users/jdh/local/n/bin/node]
    11: 0x1007d4f24 v8::internal::Runtime_AllocateInNewSpace(int, v8::internal::Object**, v8::internal::Isolate*) [/Users/jdh/local/n/bin/node]
    12: 0x1360ab75be3d
    zsh: abort      ./node_modules/.bin/tsc --pretty --target es5 --outDir lib-commonjs --module
