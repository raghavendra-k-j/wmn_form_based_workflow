MobX

Simple, scalable state management.

    

MobX is made possible by the generosity of the sponsors below, and many other individual backers. Sponsoring directly impacts the longevity of this project.

🥇🥇 Platinum sponsors ($5000+ total contribution): 🥇🥇



  

🥇 Gold sponsors ($2500+ total contribution):



          

🥈 Silver sponsors ($500+ total contributions):

          

Introduction

Anything that can be derived from the application state, should be. Automatically.

MobX is a signal based, battle-tested library that makes state management simple and scalable by transparently applying functional reactive programming. The philosophy behind MobX is simple:

😙

Straightforward

Write minimalistic, boilerplate-free code that captures your intent. Trying to update a record field? Simply use a normal JavaScript assignment — the reactivity system will detect all your changes and propagate them out to where they are being used. No special tools are required when updating data in an asynchronous process.

🚅

Effortless optimal rendering

All changes to and uses of your data are tracked at runtime, building a dependency tree that captures all relations between state and output. This guarantees that computations that depend on your state, like React components, run only when strictly needed. There is no need to manually optimize components with error-prone and sub-optimal techniques like memoization and selectors.

🤹🏻‍♂️

Architectural freedom

MobX is unopinionated and allows you to manage your application state outside of any UI framework. This makes your code decoupled, portable, and above all, easily testable.

A quick example

So what does code that uses MobX look like?

import React from "react"import ReactDOM from "react-dom"import { makeAutoObservable } from "mobx"import { observer } from "mobx-react-lite"// Model the application state.function createTimer() {

    return makeAutoObservable({

        secondsPassed: 0,

        increase() {

            this.secondsPassed += 1

        },

        reset() {

            this.secondsPassed = 0

        }

    })

}const myTimer = createTimer()// Build a "user interface" that uses the observable state.const TimerView = observer(({ timer }) => (

    <button onClick={() => timer.reset()}>Seconds passed: {timer.secondsPassed}</button>

))



ReactDOM.render(<TimerView timer={myTimer} />, document.body)// Update the 'Seconds passed: X' text every second.

setInterval(() => {

    myTimer.increase()

}, 1000)

The observer wrapper around the TimerView React component will automatically detect that rendering depends on the timer.secondsPassed observable, even though this relationship is not explicitly defined. The reactivity system will take care of re-rendering the component when precisely that field is updated in the future.

Every event (onClick / setInterval) invokes an action (myTimer.increase / myTimer.reset) that updates observable state (myTimer.secondsPassed). Changes in the observable state are propagated precisely to all computations and side effects (TimerView) that depend on the changes being made.



This conceptual picture can be applied to the above example, or any other application using MobX.

Getting started

To learn about the core concepts of MobX using a larger example, check out The gist of MobX page, or take the 10 minute interactive introduction to MobX and React.

The philosophy and benefits of the mental model provided by MobX are also described in great detail in the blog posts UI as an afterthought and How to decouple state and UI (a.k.a. you don’t need componentWillMount).

Further resources

The MobX cheat sheet (£5) is both useful and sponsors the project

10 minute interactive introduction to MobX and React

Egghead.io course, based on MobX 3

The MobX awesome list – a long list of MobX resources and example projects

The MobX book



The MobX Quick Start Guide ($24.99) by Pavan Podila and Michel Weststrate is available as an ebook, paperback, and on the O'Reilly platform (see preview).

Videos

Introduction to MobX & React in 2020 by Leigh Halliday, 17 min.

ReactNext 2016: Real World MobX by Michel Weststrate, 40 min, slides.

CityJS 2020: MobX, from mutable to immutable, to observable data by Michel Weststrate, 30 min.

OpenSourceNorth: Practical React with MobX (ES5) by Matt Ruby, 42 min.

HolyJS 2019: MobX and the unique symbiosis of predictability and speed by Michel Weststrate, 59 min.

React Amsterdam 2016: State Management Is Easy by Michel Weststrate, 20 min, slides.

{🚀} React Live 2019: Reinventing MobX by Max Gallo, 27 min.

Credits

MobX is inspired by reactive programming principles, which are for example used in spreadsheets. It is inspired by model–view–viewmodel frameworks like MeteorJS's Tracker, Knockout and Vue.js, but MobX brings transparent functional reactive programming (TFRP, a concept which is further explained in the MobX book) to the next level and provides a standalone implementation. It implements TFRP in a glitch-free, synchronous, predictable and efficient manner.

A ton of credit goes to Mendix for providing the flexibility and support to maintain MobX and the chance to prove the philosophy of MobX in a real, complex, performance critical applications.

About this documentation →

Introduction

A quick example

Getting started

Further resources

The MobX book

Videos

Credits

Docs

About MobX

The gist of MobX





About this documentation

It follows the principle that the most commonly used concepts are introduced before specialized information. This applies to the headings in the table of concepts as well as the pages under those headings.

We've marked the sections and concepts that are more advanced with the {🚀} marker. You likely won't have to understand them until you will have a special use case, and can use MobX very effectively without knowing about them. Feel free to skip them and move on to the next section!

The documentation has been rewritten for MobX 6. For older versions of MobX, it can be found here. All the principles are the same, and the API is largely the same. The main difference is that before MobX 6, decorators were the recommended syntax to write MobX enhanced classes.

A summary of the documentation can be downloaded as cheat sheet:

Download the MobX 6 cheat sheet



Guided tour

To get an overall idea of how to use MobX with React, read through the current Introduction heading, in particular The gist of MobX section. It will introduce you to the most important principles, APIs and how they relate. You should be ready to use MobX once you read this!

Here are a few suggestions about the next things to check out:

Try the 10 minute interactive introduction to MobX and React



React integration

makeObservable / makeAutoObservable

Learn about actions, which includes a discussion on asynchronous actions

The basics of computeds

Read about autorun, if only because it's used in the examples

To get an idea on how to organize your application's data stores, check out Defining data stores

If the behavior of MobX confuses you, it's useful to check out Understanding reactivity

Get a quick overview of the API, also linked in the top navigation bar

This should give you a good understanding of the day-to-day uses of MobX. There is plenty more available for you to read at your own leisure.

← About MobX

Installation →

Guided tour

Docs

About MobX

The gist of MobX





Installation

MobX works in any ES5 environment, which includes browsers and NodeJS.

There are three types of React bindings:

mobx-react-lite. Utilities to manually apply observation

mobx-react-observer. Babel/swc plugin to automatically apply observation to components

mobx-react. Support for class components

Append the appropriate bindings for your use case to the Yarn or NPM command below:

Yarn: yarn add mobx

NPM: npm install --save mobx

CDN: https://cdnjs.com/libraries/mobx / https://unpkg.com/mobx/dist/mobx.umd.production.min.js



Transpilation settings

MobX and Decorators

Based on your preference, MobX can be used with or without decorators. Both the legacy implementation and the standardised TC-39 version of decorators are currently supported. See enabling-decorators for more details on how to enable them. Legacy decorator support will be removed in MobX 7, in favor of the standard.

Use spec compliant transpilation for class properties

When using MobX with TypeScript or Babel, and you plan to use classes; make sure to update your configuration to use a TC-39 spec compliant transpilation for class fields, since this is not always the default. Without this, class fields cannot be made observable before they are initialized.

TypeScript: Set the compiler option "useDefineForClassFields": true.

Babel: Make sure to use at least version 7.12, with the following configuration:{

    // Babel < 7.13.0

    "plugins": [["@babel/plugin-proposal-class-properties", { "loose": false }]],



    // Babel >= 7.13.0 (https://babeljs.io/docs/en/assumptions)

    "plugins": [["@babel/plugin-proposal-class-properties"]],

    "assumptions": {

        "setPublicClassFields": false

    }

}

For verification insert this piece of code at the beginning of your sources (eg. index.js)

if (!new class { x }().hasOwnProperty('x')) throw new Error('Transpiler is not configured correctly');

MobX on older JavaScript environments

By default, MobX uses proxies for optimal performance and compatibility. However, on older JavaScript engines Proxy is not available (check out Proxy support). Examples of such are Internet Explorer (before Edge), Node.js < 6, iOS < 10, Android before RN 0.59.

In such cases, MobX can fallback to an ES5 compatible implementation which works almost identically, although there are a few limitations without Proxy support. You will have to explicitly enable the fallback implementation by configuring useProxies:

import { configure } from "mobx"



configure({ useProxies: "never" }) // Or "ifavailable".

This option will be removed in MobX 7.

MobX on other frameworks / platforms

MobX.dart: MobX for Flutter / Dart

lit-mobx: MobX for lit-element

mobx-angular: MobX for angular

mobx-vue: MobX for Vue

← About this documentation







The gist of MobX

Concepts

MobX distinguishes between the following three concepts in your application:

State

Actions

Derivations

Let's take a closer look at these concepts below, or alternatively, in the 10 minute introduction to MobX and React, where you can interactively dive deeper into these concepts step by step and build a simple Todo list app.

Some might recognise the concept of "Signals" in the concepts described below. This is correct, MobX is a signal based state management library avant la lettre.

1. Define state and make it observable

State is the data that drives your application. Usually, there is domain specific state like a list of todo items, and there is view state, such as the currently selected element. State is like spreadsheet cells that hold a value.

Store state in any data structure you like: plain objects, arrays, classes, cyclic data structures or references. It doesn't matter for the workings of MobX. Just make sure that all properties you want to change over time are marked as observable so MobX can track them.

Here is a simple example:

import { makeObservable, observable, action } from "mobx"class Todo {

    id = Math.random()

    title = ""

    finished = false



    constructor(title) {

        makeObservable(this, {

            title: observable,

            finished: observable,

            toggle: action

        })

        this.title = title

    }



    toggle() {

        this.finished = !this.finished

    }

}

Using observable is like turning a property of an object into a spreadsheet cell. But unlike spreadsheets, these values can not only be primitive values, but also references, objects and arrays.

Tip: Prefer classes, plain objects or decorators? MobX supports many styles.



But what about toggle, which we marked as action?

2. Update state using actions

An action is any piece of code that changes the state. User events, backend data pushes, scheduled events, etc. An action is like a user that enters a new value into a spreadsheet cell.

In the Todo model above you can see that we have a toggle method that changes the value of finished. finished is marked as observable. It is recommended that you mark any piece of code that changes observable's as an action. That way MobX can automatically apply transactions for effortless optimal performance.

Using actions helps you structure your code and prevents you from inadvertently changing state when you don't intend to. Methods that modify state are called actions in MobX terminology. In contrast to views, which compute new information based on the current state. Every method should serve at most one of those two goals.

3. Create derivations that automatically respond to state changes

Anything that can be derived from the state without any further interaction is a derivation. Derivations exist in many forms:

The user interface

Derived data, such as the number of remaining todos

Backend integrations, e.g. sending changes to the server

MobX distinguishes between two kinds of derivations:

Computed values, which can always be derived from the current observable state using a pure function

Reactions, side effects that need to happen automatically when the state changes (bridge between imperative and reactive programming)

When starting with MobX, people tend to overuse reactions. The golden rule is, always use computed if you want to create a value based on the current state.

3.1. Model derived values using computed

To create a computed value, define a property using a JS getter function get and mark it as computed with makeObservable.

import { makeObservable, observable, computed } from "mobx"class TodoList {

    todos = []

    get unfinishedTodoCount() {

        return this.todos.filter(todo => !todo.finished).length

    }

    constructor(todos) {

        makeObservable(this, {

            todos: observable,

            unfinishedTodoCount: computed

        })

        this.todos = todos

    }

}

MobX will ensure that unfinishedTodoCount is updated automatically when a todo is added or when one of the finished properties is modified.

These computations resemble formulas in spreadsheet programs like MS Excel. They update automatically, but only when required. That is, if something is interested in their outcome.

3.2. Model side effects using reactions

For you as a user to be able to see a change in state or computed values on the screen, a reaction that repaints a part of the GUI is needed.

Reactions are similar to computed values, but instead of producing information, they produce side effects like printing to the console, making network requests, incrementally updating React component tree to patch the DOM, etc.

In short, reactions bridge the worlds of reactive and imperative programming.

By far the most used form of reactions are UI components. Note that it is possible to trigger side effects from both actions and reactions. Side effects that have a clear, explicit origin from which they can be triggered, such as making a network request when submitting a form, should be triggered explicitly from the relevant event handler.

3.3. Reactive React components

If you are using React, you can make your components reactive by wrapping them with the observer function from the bindings package you've chosen during installation. In this example, we're going to use the more lightweight mobx-react-lite package.

import * as React from "react"import { render } from "react-dom"import { observer } from "mobx-react-lite"const TodoListView = observer(({ todoList }) => (

    <div>

        <ul>

            {todoList.todos.map(todo => (

                <TodoView todo={todo} key={todo.id} />

            ))}

        </ul>

        Tasks left: {todoList.unfinishedTodoCount}

    </div>

))const TodoView = observer(({ todo }) => (

    <li>

        <input type="checkbox" checked={todo.finished} onClick={() => todo.toggle()} />

        {todo.title}

    </li>

))const store = new TodoList([new Todo("Get Coffee"), new Todo("Write simpler code")])

render(<TodoListView todoList={store} />, document.getElementById("root"))

observer converts React components into derivations of the data they render. When using MobX there are no smart or dumb components. All components render smartly, but are defined in a dumb manner. MobX will simply make sure the components are always re-rendered whenever needed, and never more than that.

So the onClick handler in the above example will force the proper TodoView component to re-render as it uses the toggle action, but will only cause the TodoListView component to re-render if the number of unfinished tasks has changed. And if you would remove the Tasks left line (or put it into a separate component), the TodoListView component would no longer re-render when ticking a task.

To learn more about how React works with MobX, check out the React integration section.

3.4. Custom reactions

You will need them rarely, but they can be created using the autorun, reaction or when functions to fit your specific situations. For example, the following autorun prints a log message every time the amount of unfinishedTodoCount changes:

// A function that automatically observes the state.

autorun(() => {

    console.log("Tasks left: " + todos.unfinishedTodoCount)

})

Why does a new message get printed every time the unfinishedTodoCount is changed? The answer is this rule of thumb:

MobX reacts to any existing observable property that is read during the execution of a tracked function.

To learn more about how MobX determines which observables need to be reacted to, check out the Understanding reactivity section.

Principles

MobX uses a uni-directional data flow where actions change the state, which in turn updates all affected views.



All derivations are updated automatically and atomically when the state changes. As a result, it is never possible to observe intermediate values.



All derivations are updated synchronously by default. This means that, for example, actions can safely inspect a computed value directly after altering the state.

Computed values are updated lazily. Any computed value that is not actively in use will not be updated until it is needed for a side effect (I/O). If a view is no longer in use it will be garbage collected automatically.

All computed values should be pure. They are not supposed to change state.

To learn more about the background context, check out the fundamental principles behind MobX.

Try it out!

You can play with the above examples yourself on CodeSandbox.

Linting

If you find it hard to adopt the mental model of MobX, configure it to be very strict and warn you at runtime whenever you deviate from these patterns. Check out the linting MobX section.

← Installation

Creating observable state

Properties, entire objects, arrays, Maps and Sets can all be made observable. The basics of making objects observable is specifying an annotation per property using makeObservable. The most important annotations are:

observable defines a trackable field that stores the state.

action marks a method as an action that will modify the state.

computed marks a getter that will derive new facts from the state and cache its output.

makeObservable

Usage:

makeObservable(target, annotations?, options?)

This function can be used to make existing object properties observable. Any JavaScript object (including class instances) can be passed into target. Typically makeObservable is used in the constructor of a class, and its first argument is this. The annotations argument maps annotations to each member. Only annotated members are affected.

Alternatively, decorators like @observable can be used on class members instead of calling makeObservable in the constructor.

Methods that derive information and take arguments (for example findUsersOlderThan(age: number): User[]) can not be annotated as computed – their read operations will still be tracked when they are called from a reaction, but their output won't be memoized to avoid memory leaks. To memoize such methods you can use MobX-utils computedFn {🚀} instead.

Subclassing is supported with some limitations by using the override annotation (see the example here).

class + makeObservable

class + decorators

factory function + makeAutoObservable

observable

class + decorators (legacy)

import { makeObservable, observable, computed, action, flow } from "mobx"



class Doubler {

    value



    constructor(value) {

        makeObservable(this, {

            value: observable,

            double: computed,

            increment: action,

            fetch: flow

        })

        this.value = value

    }



    get double() {

        return this.value * 2

    }



    increment() {

        this.value++

    }



    *fetch() {

        const response = yield fetch("/api/value")

        this.value = response.json()

    }

}

All annotated fields are non-configurable.

All non-observable (stateless) fields (action, flow) are non-writable.

makeAutoObservable

Usage:

makeAutoObservable(target, overrides?, options?)

makeAutoObservable is like makeObservable on steroids, as it infers all the properties by default. You can however use the overrides parameter to override the default behavior with specific annotations — in particular false can be used to exclude a property or method from being processed entirely. Check out the code above for an example.

The makeAutoObservable function can be more compact and easier to maintain than using makeObservable, since new members don't have to be mentioned explicitly. However, makeAutoObservable cannot be used on classes that have super or are subclassed.

Inference rules:

All own properties become observable.

All getters become computed.

All setters become action.

All functions become autoAction.

All generator functions become flow. (Note that generator functions are not detectable in some transpiler configurations, if flow doesn't work as expected, make sure to specify flow explicitly.)

Members marked with false in the overrides argument will not be annotated. For example, using it for read only fields such as identifiers.

observable

Usage:

observable(source, overrides?, options?)

@observable accessor (field decorator)

The observable annotation can also be called as a function to make an entire object observable at once. The source object will be cloned and all members will be made observable, similar to how it would be done by makeAutoObservable. Likewise, an overrides map can be provided to specify the annotations of specific members. Check out the above code block for an example.

The object returned by observable will be a Proxy, which means that properties that are added later to the object will be picked up and made observable as well (except when proxy usage is disabled).

The observable method can also be called with collections types like arrays, Maps and Sets. Those will be cloned as well and converted into their observable counterparts.

Tip: as holds for JavaScript in general, don't use observable plain objects to create a keyed collection (for example to store a mapping from a user's UUID to user object), use maps instead. Object descriptors are aggressively cached by MobX, so if property names are unstable, this might result in memory leaks.

Example: observable array











Note: primitives and class instances are never converted to observables





{🚀} Tip: observable (proxied) versus makeObservable (unproxied)







Available annotations

AnnotationDescriptionobservable

observable.deepDefines a trackable field that stores state. If possible, any value assigned to observable is automatically converted to (deep) observable, autoAction or flow based on it's type. Only plain object, array, Map, Set, function, generator function are convertible. Class instances and others are untouched.observable.refLike observable, but only reassignments will be tracked. The assigned values are completely ignored and will NOT be automatically converted to observable/autoAction/flow. For example, use this if you intend to store immutable data in an observable field.observable.shallowLike observable.ref but for collections. Any collection assigned will be made observable, but the contents of the collection itself won't become observable.observable.structLike observable, except that any assigned value that is structurally equal to the current value will be ignored.actionMark a method as an action that will modify the state. Check out actions for more details. Non-writable.action.boundLike action, but will also bind the action to the instance so that this will always be set. Non-writable.computedCan be used on a getter to declare it as a derived value that can be cached. Check out computeds for more details.computed.structLike computed, except that if after recomputing the result is structurally equal to the previous result, no observers will be notified.trueInfer the best annotation. Check out makeAutoObservable for more details.falseExplicitly do not annotate this property.flowCreates a flow to manage asynchronous processes. Check out flow for more details. Note that the inferred return type in TypeScript might be off. Non-writable.flow.boundLike flow, but will also bind the flow to the instance so that this will always be set. Non-writable.overrideApplicable to inherited action, flow, computed, action.bound overridden by subclass.autoActionShould not be used explicitly, but is used under the hood by makeAutoObservable to mark methods that can act as action or derivation, based on their calling context. It will be determined at runtime if the function is a derivation or action.

Limitations

make(Auto)Observable only supports properties that are already defined. Make sure your compiler configuration is correct, or as work-around, that a value is assigned to all properties before using make(Auto)Observable. Without correct configuration, fields that are declared but not initialized (like in class X { y; }) will not be picked up correctly.

makeObservable can only annotate properties declared by its own class definition. If a sub- or superclass introduces observable fields, it will have to call makeObservable for those properties itself.

options argument can be provided only once. Passed options are "sticky" and can NOT be changed later (eg. in subclass).

Every field can be annotated only once (except for override). The field annotation or configuration can't change in subclass.

All annotated fields of non-plain objects (classes) are non-configurable.

Can be disabled with configure({ safeDescriptors: false }) {🚀☣️} .

All non-observable (stateless) fields (action, flow) are non-writable.

Can be disabled with configure({ safeDescriptors: false }) {🚀☣️} .

Only action, computed, flow, action.bound defined on prototype can be overridden by subclass.

By default TypeScript will not allow you to annotate private fields. This can be overcome by explicitly passing the relevant private fields as generic argument, like this: makeObservable<MyStore, "privateField" | "privateField2">(this, { privateField: observable, privateField2: observable })

Calling make(Auto)Observable and providing annotations must be done unconditionally, as this makes it possible to cache the inference results.

Modifying prototypes after make(Auto)Observable has been called is not supported.

EcmaScript private fields (#field) are not supported by make(Auto)Observable. Use auto-accessor + Stage-3 decorators (@observable accessor #field) syntax instead. Otherwise, when using TypeScript, it is recommended to use the private modifier.

Mixing annotations and decorators within single inheritance chain is not supported - eg. you can't use decorators for superclass and annotations for subclass.

makeObservable,extendObservable cannot be used on other builtin observable types (ObservableMap, ObservableSet, ObservableArray, etc)

makeObservable(Object.create(prototype)) copies properties from prototype to created object and makes them observable. This behavior is wrong, unexpected and therefore deprecated and will likely change in future versions. Don't rely on it.

Options {🚀}

The above APIs take an optional options argument which is an object that supports the following options:

autoBind: true uses action.bound/flow.bound by default, rather than action/flow. Does not affect explicitely annotated members.

deep: false uses observable.ref by default, rather than observable. Does not affect explicitely annotated members.

name: <string> gives the object a debug name that is printed in error messages and reflection APIs.

proxy: false forces observable(thing) to use non-proxy implementation. This is a good option if the shape of the object will not change over time, as non-proxied objects are easier to debug and faster. This option is not available for make(Auto)Observable, see avoiding proxies.

Note: options are sticky and can be provided only once







Converting observables back to vanilla JavaScript collections

Sometimes it is necessary to convert observable data structures back to their vanilla counterparts. For example when passing observable objects to a React component that can't track observables, or to obtain a clone that should not be further mutated.

To convert a collection shallowly, the usual JavaScript mechanisms work:

const plainObject = { ...observableObject }const plainArray = observableArray.slice()const plainMap = new Map(observableMap)

To convert a data tree recursively to plain objects, the toJS utility can be used. For classes, it is recommended to implement a toJSON() method, as it will be picked up by JSON.stringify.

A short note on classes

So far most examples above have been leaning towards the class syntax. MobX is in principle unopinionated about this, and there are probably just as many MobX users that use plain objects. However, a slight benefit of classes is that they have more easily discoverable APIs, e.g. TypeScript. Also, instanceof checks are really powerful for type inference, and class instances aren't wrapped in Proxy objects, giving them a better experience in debuggers. Finally, classes benefit from a lot of engine optimizations, since their shape is predictable, and methods are shared on the prototype. But heavy inheritance patterns can easily become foot-guns, so if you use classes, keep them simple. So, even though there is a slight preference to use classes, we definitely want to encourage you to deviate from this style if that suits you better.

← The gist of MobX

Actions →

makeObservable

makeAutoObservable

observable

Available annotations

Limitations

Options {🚀}

Converting observables back to vanilla JavaScript collections

A short note on classes

Docs

About MobX

The gist of MobX



Updating state using actions

Usage:

action (annotation)

action(fn)

action(name, fn)

@action (method / field decorator)

All applications have actions. An action is any piece of code that modifies the state. In principle, actions always happen in response to an event. For example, a button was clicked, some input changed, a websocket message arrived, etc.

MobX requires that you declare your actions, although makeAutoObservable can automate much of this job. Actions help you structure your code better and offer the following performance benefits:

They are run inside transactions. No reactions will be run until the outer-most action has finished, guaranteeing that intermediate or incomplete values produced during an action are not visible to the rest of the application until the action has completed.



By default, it is not allowed to change the state outside of actions. This helps to clearly identify in your code base where the state updates happen.

The action annotation should only be used on functions that intend to modify the state. Functions that derive information (performing lookups or filtering data) should not be marked as actions, to allow MobX to track their invocations. action annotated members will be non-enumerable.

Examples

makeObservable

@action

makeAutoObservable

action.bound

action(fn)

runInAction(fn)

import { makeObservable, observable, action } from "mobx"



class Doubler {

    value = 0



    constructor() {

        makeObservable(this, {

            value: observable,

            increment: action

        })

    }



    increment() {

        // Intermediate states will not become visible to observers.

        this.value++

        this.value++

    }

}

Wrapping functions using action

To leverage the transactional nature of MobX as much as possible, actions should be passed as far outward as possible. It is good to mark a class method as an action if it modifies the state. It is even better to mark event handlers as actions, as it is the outer-most transaction that counts. A single unmarked event handler that calls two actions subsequently would still generate two transactions.

To help create action based event handlers, action is not only an annotation, but also a higher order function. It can be called with a function as an argument, and in that case it will return an action wrapped function with the same signature.

For example in React, an onClick handler can be wrapped as below.

const ResetButton = ({ formState }) => (

    <button

        onClick={action(e => {

            formState.resetPendingUploads()

            formState.resetValues()

            e.preventDefault()

        })}

    >

        Reset form

    </button>

)

For debugging purposes, we recommend to either name the wrapped function, or pass a name as the first argument to action.

Note: actions are untracked





action.bound

Usage:

action.bound (annotation)

The action.bound annotation can be used to automatically bind a method to the correct instance, so that this is always correctly bound inside the function.

Tip: use makeAutoObservable(o, {}, { autoBind: true }) to bind all actions and flows automatically



runInAction

Usage:

runInAction(fn)

Use this utility to create a temporary action that is immediately invoked. Can be useful in asynchronous processes. Check out the above code block for an example.

Actions and inheritance

Only actions defined on prototype can be overridden by subclass:

class Parent {

    // on instance

    arrowAction = () => {}



    // on prototype

    action() {}

    boundAction() {}



    constructor() {

        makeObservable(this, {

            arrowAction: action

            action: action,

            boundAction: action.bound,

        })

    }

}class Child extends Parent {

    // THROWS: TypeError: Cannot redefine property: arrowAction

    arrowAction = () => {}



    // OK

    action() {}

    boundAction() {}



    constructor() {

        super()

        makeObservable(this, {

            arrowAction: override,

            action: override,

            boundAction: override,

        })

    }

}

To bind a single action to this, action.bound can be used instead of arrow functions.

See subclassing for more information.

Asynchronous actions

In essence, asynchronous processes don't need any special treatment in MobX, as all reactions will update automatically regardless of the moment in time they are caused. And since observable objects are mutable, it is generally safe to keep references to them for the duration of an action. However, every step (tick) that updates observables in an asynchronous process should be marked as action. This can be achieved in multiple ways by leveraging the above APIs, as shown below.

For example, when handling promises, the handlers that update state should be actions or should be wrapped using action, as shown below.

Wrap handlers in `action`

Handle updates in separate actions

async/await + runInAction

`flow` + generator function

Promise resolution handlers are handled in-line, but run after the original action finished, so they need to be wrapped by action:

import { action, makeAutoObservable } from "mobx"



class Store {

    githubProjects = []

    state = "pending" // "pending", "done" or "error"



    constructor() {

        makeAutoObservable(this)

    }



    fetchProjects() {

        this.githubProjects = []

        this.state = "pending"

        fetchGithubProjectsSomehow().then(

            action("fetchSuccess", projects => {

                const filteredProjects = somePreprocessing(projects)

                this.githubProjects = filteredProjects

                this.state = "done"

            }),

            action("fetchError", error => {

                this.state = "error"

            })

        )

    }

}

Using flow instead of async / await {🚀}

Usage:

flow (annotation)

flow(function* (args) { })

@flow (method decorator)

The flow wrapper is an optional alternative to async / await that makes it easier to work with MobX actions. flow takes a generator function as its only input. Inside the generator, you can chain promises by yielding them (instead of await somePromise you write yield somePromise). The flow mechanism will then make sure the generator either continues or throws when a yielded promise resolves.

So flow is an alternative to async / await that doesn't need any further action wrapping. It can be applied as follows:

Wrap flow around your asynchronous function.

Instead of async use function *.

Instead of await use yield.

The flow + generator function example above shows what this looks like in practice.

Note that the flowResult function is only needed when using TypeScript. Since decorating a method with flow, it will wrap the returned generator in a promise. However, TypeScript isn't aware of that transformation, so flowResult will make sure that TypeScript is aware of that type change.

makeAutoObservable and friends will automatically infer generators to be flows. flow annotated members will be non-enumerable.

{🚀} Note: using flow on object fields





flow.bound

Usage:

flow.bound (annotation)

The flow.bound annotation can be used to automatically bind a method to the correct instance, so that this is always correctly bound inside the function. Similary to actions, flows can be bound by default using autoBind option.

Cancelling flows {🚀}

Another neat benefit of flows is that they are cancellable. The return value of flow is a promise that resolves with the value that is returned from the generator function in the end. The returned promise has an additional cancel() method that will interrupt the running generator and cancel it. Any try / finally clauses will still be run.

Disabling mandatory actions {🚀}

By default, MobX 6 and later require that you use actions to make changes to the state. However, you can configure MobX to disable this behavior. Check out the enforceActions section. For example, this can be quite useful in unit test setup, where the warnings don't always have much value.

← Observable state

Deriving information with computeds
Usage:

computed (annotation)
computed(options) (annotation)
computed(fn, options?)
@computed (getter decorator)
@computed(options) (getter decorator)
Computed values can be used to derive information from other observables. They evaluate lazily, caching their output and only recomputing if one of the underlying observables has changed. If they are not observed by anything, they suspend entirely.

Conceptually, they are very similar to formulas in spreadsheets, and can't be underestimated. They help in reducing the amount of state you have to store and are highly optimized. Use them wherever possible.

Example
Computed values can be created by annotating JavaScript getters with computed. Use makeObservable to declare a getter as computed. If you instead want all getters to be automatically declared as computed, you can use either makeAutoObservable, observable or extendObservable. Computed getters become non-enumerable.

To help illustrate the point of computed values, the example below relies on autorun from the Reactions {🚀} advanced section.

import { makeObservable, observable, computed, autorun } from "mobx"

class OrderLine {
    price = 0
    amount = 1

    constructor(price) {
        makeObservable(this, {
            price: observable,
            amount: observable,
            total: computed
        })
        this.price = price
    }

    get total() {
        console.log("Computing...")
        return this.price * this.amount
    }
}

const order = new OrderLine(0)

const stop = autorun(() => {
    console.log("Total: " + order.total)
})
// Computing...
// Total: 0

console.log(order.total)
// (No recomputing!)
// 0

order.amount = 5
// Computing...
// (No autorun)

order.price = 2
// Computing...
// Total: 10

stop()

order.price = 3
// Neither the computation nor autorun will be recomputed.
The above example nicely demonstrates the benefits of a computed value, it acts as a caching point. Even though we change the amount, and this will trigger the total to recompute, it won't trigger the autorun, as total will detect its output hasn't been affected, so there is no need to update the autorun.

In comparison, if total would not be annotated, the autorun would run its effect 3 times, as it would directly depend on total and amount. Try it out yourself.

computed graph

This is the dependency graph that would be created for the above example.

Rules
When using computed values there are a couple of best practices to follow:

They should not have side effects or update other observables.
Avoid creating and returning new observables.
They should not depend on non-observable values.
Tips
Tip: computed values will be suspended if they are not observed
Tip: computed values can have setters
{🚀} Tip: computed.struct for comparing output structurally 
{🚀} Tip: computed values with arguments
{🚀} Tip: create standalone computed values with computed(expression)
Options {🚀}
computed usually behaves the way you want it to out of the box, but it's possible to customize its behavior by passing in an options argument.

name
This string is used as a debug name in the Spy event listeners and MobX developer tools.

equals
Set to comparer.default by default. It acts as a comparison function for comparing the previous value with the next value. If this function considers the values to be equal, then the observers will not be re-evaluated.

This is useful when working with structural data and types from other libraries. For example, a computed moment instance could use (a, b) => a.isSame(b). comparer.structural and comparer.shallow come in handy if you want to use structural / shallow comparison to determine whether the new value is different from the previous value, and as a result notify its observers.

Check out the computed.struct section above.

Built-in comparers
MobX provides four built-in comparer methods which should cover most needs of the equals option of computed:

comparer.identity uses the identity (===) operator to determine if two values are the same.
comparer.default is the same as comparer.identity, but also considers NaN to be equal to NaN.
comparer.structural performs deep structural comparison to determine if two values are the same.
comparer.shallow performs shallow structural comparison to determine if two values are the same.
You can import comparer from mobx to access these methods. They can be used for reaction as well.

requiresReaction
It is recommended to set this one to true on very expensive computed values. If you try to read its value outside of the reactive context, in which case it might not be cached, it will cause the computed to throw instead of doing an expensive re-evalution.

keepAlive
This avoids suspending computed values when they are not being observed by anything (see the above explanation). Can potentially create memory leaks, similar to the ones discussed for reactions.

← ActionsReactions {🚀} →
Example
Rules
Tips
Options {🚀}
name
equals
requiresReaction
keepAlive
MobX 🇺🇦
Docs
About MobX
The gist of MobX


Running side effects with reactions {🚀}
Reactions are an important concept to understand, as it is where everything in MobX comes together. The goal of reactions is to model side effects that happen automatically. Their significance is in creating consumers for your observable state and automatically running side effects whenever something relevant changes.

However, with that in mind, it is important to realize that the APIs discussed here should rarely be used. They are often abstracted away in other libraries (like mobx-react) or abstractions specific to your application.

But, to grok MobX, let's take a look at how reactions can be created. The simplest way is to use the autorun utility. Beyond that, there are also reaction and when.

Autorun
Usage:

autorun(effect: (reaction) => void, options?)
The autorun function accepts one function that should run every time anything it observes changes. It also runs once when you create the autorun itself. It only responds to changes in observable state, things you have annotated observable or computed.

How tracking works
Autorun works by running the effect in a reactive context. During the execution of the provided function, MobX keeps track of all observable and computed values that are directly or indirectly read by the effect. Once the function finishes, MobX will collect and subscribe to all observables that were read and wait until any of them changes again. Once they do, the autorun will trigger again, repeating the entire process.

autorun

This is how the example below works like.

Example
import { makeAutoObservable, autorun } from "mobx"

class Animal {
    name
    energyLevel

    constructor(name) {
        this.name = name
        this.energyLevel = 100
        makeAutoObservable(this)
    }

    reduceEnergy() {
        this.energyLevel -= 10
    }

    get isHungry() {
        return this.energyLevel < 50
    }
}

const giraffe = new Animal("Gary")

autorun(() => {
    console.log("Energy level:", giraffe.energyLevel)
})

autorun(() => {
    if (giraffe.isHungry) {
        console.log("Now I'm hungry!")
    } else {
        console.log("I'm not hungry!")
    }
})

console.log("Now let's change state!")
for (let i = 0; i < 10; i++) {
    giraffe.reduceEnergy()
}
Running this code, you will get the following output:

Energy level: 100
I'm not hungry!
Now let's change state!
Energy level: 90
Energy level: 80
Energy level: 70
Energy level: 60
Energy level: 50
Energy level: 40
Now I'm hungry!
Energy level: 30
Energy level: 20
Energy level: 10
Energy level: 0
As you can see in the first two lines of the output above, both autorun functions run once when they are initialized. This is all you would see without the for loop.

Once we run the for loop to change the energyLevel with the reduceEnergy action, we see a new log entry every time an autorun function observes a change in its observable state:

For the "Energy level" function, this is every time the energyLevel observable changes, 10 times in total.

For the "Now I'm hungry" function, this is every time the isHungry computed changes, only one time.

Reaction
Usage:

reaction(() => value, (value, previousValue, reaction) => { sideEffect }, options?).
reaction is like autorun, but gives more fine grained control on which observables will be tracked. It takes two functions: the first, data function, is tracked and returns the data that is used as input for the second, effect function. It is important to note that the side effect only reacts to data that was accessed in the data function, which might be less than the data that is actually used in the effect function.

The typical pattern is that you produce the things you need in your side effect in the data function, and in that way control more precisely when the effect triggers. By default, the result of the data function has to change in order for the effect function to be triggered. Unlike autorun, the side effect won't run once when initialized, but only after the data expression returns a new value for the first time.

Example: the data and effect functions
When
Usage:

when(predicate: () => boolean, effect?: () => void, options?)
when(predicate: () => boolean, options?): Promise
when observes and runs the given predicate function until it returns true. Once that happens, the given effect function is executed and the autorunner is disposed.

The when function returns a disposer, allowing you to cancel it manually, unless you don't pass in a second effect function, in which case it returns a Promise.

Example: dispose of things in a reactive way
await when(...)
If no effect function is provided, when returns a Promise. This combines nicely with async / await to let you wait for changes in observable state.

async function() {
    await when(() => that.isVisible)
    // etc...
}
To cancel when prematurely, it is possible to call .cancel() on the promise returned by itself.

Rules
There are a few rules that apply to any reactive context:

Affected reactions run by default immediately (synchronously) if an observable is changed. However, they won't run before the end of the current outermost (trans)action.
Autorun tracks only the observables that are read during the synchronous execution of the provided function, but it won't track anything that happens asynchronously.
Autorun won't track observables that are read by an action invoked by the autorun, as actions are always untracked.
For more examples on what precisely MobX will and will not react to, check out the Understanding reactivity section. For a more detailed technical breakdown on how tracking works, read the blog post Becoming fully reactive: an in-depth explanation of MobX.

Always dispose of reactions
The functions passed to autorun, reaction and when are only garbage collected if all objects they observe are garbage collected themselves. In principle, they keep waiting forever for new changes to happen in the observables they use. To be able to stop them from waiting until forever has passed, they all return a disposer function that can be used to stop them and unsubscribe from any observables they used.

const counter = observable({ count: 0 })

// Sets up the autorun and prints 0.
const disposer = autorun(() => {
    console.log(counter.count)
})

// Prints: 1
counter.count++

// Stops the autorun.
disposer()

// Will not print.
counter.count++
We strongly recommend to always use the disposer function that is returned from these methods as soon as their side effect is no longer needed. Failing to do so can lead to memory leaks.

The reaction argument that is passed as second argument to the effect functions of reaction and autorun, can be used to prematurely clean up the reaction as well by calling reaction.dispose().

Example: memory leak
In environments that support Explicit Resource Management, the disposer function includes a [Symbol.dispose] method that can be used to dispose of the reaction. This can be useful when disposing of several reactions simultaneously or when disposing of reactions alongside other Disposables.

Example: using DisposableStack
Use reactions sparingly!
As it was already said, you won't create reactions very often. It might very well be that your application doesn't use any of these APIs directly, and the only way reactions are constructed is indirectly, through for example observer from the mobx-react bindings.

Before you set up a reaction, it is good to first check if it conforms to the following principles:

Only use Reactions if there is no direct relation between cause and effect: If a side effect should happen in response to a very limited set of events / actions, it will often be clearer to directly trigger the effect from those specific actions. For example, if pressing a form submit button should lead to a network request to be posted, it is clearer to trigger this effect directly in response of the onClick event, rather than indirectly through a reaction. In contrast, if any change you make to the form state should automatically end up in local storage, then a reaction can be very useful, so that you don't have to trigger this effect from every individual onChange event.
Reactions shouldn't update other observables: Is the reaction going to modify other observables? If the answer is yes, typically the observable you want to update should be annotated as a computed value instead. For example, if a collection of todos is altered, don't use a reaction to compute the amount of remainingTodos, but annotate remainingTodos as a computed value. That will lead to much clearer and easier to debug code. Reactions should not compute new data, but only cause effects.
Reactions should be independent: Does your code rely on some other reaction having to run first? If that is the case, you probably either violated the first rule, or the new reaction you are about to create should be merged into the one it is depending upon. MobX does not guarantee the order in which reactions will be run.
There are real-life scenarios that do not fit in the above principles. That is why they are principles, not laws. But, the exceptions are rare so only violate them as a last resort.

Options {🚀}
The behavior of autorun, reaction and when can be further fine-tuned by passing in an options argument as shown in the usages above.

name
This string is used as a debug name for this reaction in the Spy event listeners and MobX developer tools.

fireImmediately (reaction)
Boolean indicating that the effect function should immediately be triggered after the first run of the data function. false by default.

delay (autorun, reaction)
Number of milliseconds that can be used to throttle the effect function. If zero (default), no throttling happens.

timeout (when)
Set a limited amount of time that when will wait for. If the deadline passes, when will reject / throw.

signal
An AbortSignal object instance; can be used as an alternative method for disposal.
When used with promise version of when, the promise rejects with the "WHEN_ABORTED" error.

onError
By default, any exception thrown inside an reaction will be logged, but not further thrown. This is to make sure that an exception in one reaction does not prevent the scheduled execution of other, possibly unrelated reactions. This also allows reactions to recover from exceptions. Throwing an exception does not break the tracking done by MobX, so subsequent runs of the reaction might complete normally again if the cause for the exception is removed. This option allows overriding that behavior. It is possible to set a global error handler or to disable catching errors completely using configure.

scheduler (autorun, reaction)
Set a custom scheduler to determine how re-running the autorun function should be scheduled. It takes a function that should be invoked at some point in the future, for example: { scheduler: run => { setTimeout(run, 1000) }}

equals: (reaction)
Set to comparer.default by default. If specified, this comparer function is used to compare the previous and next values produced by the data function. The effect function is only invoked if this function returns false.

Check out the Built-in comparers section.

← Computeds


MobX API Reference
Functions marked with {🚀} are considered advanced, and should typically not be needed. Consider downloading our handy cheat sheet that explains all important APIs on a single page:

Get the MobX 6 cheat sheet (£5)
Core APIs
These are the most important MobX APIs.

Understanding observable, computed, reaction and action is enough to master and use MobX in your applications!

Creating observables
Making things observable.

makeObservable
Usage: makeObservable(target, annotations?, options?) (further information)

Properties, entire objects, arrays, Maps and Sets can all be made observable.

makeAutoObservable
Usage: makeAutoObservable(target, overrides?, options?) (further information)

Automatically make properties, objects, arrays, Maps and Sets observable.

extendObservable
{🚀} Usage: extendObservable(target, properties, overrides?, options?)

Can be used to introduce new properties on the target object and make them observable immediately. Basically a shorthand for Object.assign(target, properties); makeAutoObservable(target, overrides, options);. However, existing properties on target won't be touched.

Old-fashioned constructor functions can nicely leverage extendObservable:

function Person(firstName, lastName) {
    extendObservable(this, { firstName, lastName })
}

const person = new Person("Michel", "Weststrate")
It is possible to use extendObservable to add observable fields to an existing object after instantiation, but be careful that adding an observable property this way is in itself not a fact that can be observed.

observable
Usage: observable(source, overrides?, options?), observable (annotation) or @observable accessor (field decorator). (further information)

Clones an object and makes it observable. Source can be a plain object, array, Map or Set. By default, observable is applied recursively. If one of the encountered values is an object or array, that value will be passed through observable as well.

observable.object
{🚀} Usage: observable.object(source, overrides?, options?) (further information)

Alias for observable(source, overrides?, options?). Creates a clone of the provided object and makes all of its properties observable.

observable.array
{🚀} Usage: observable.array(initialValues?, options?)

Creates a new observable array based on the provided initialValues. To convert observable arrays back to plain arrays, use the .slice() method, or check out toJS to convert them recursively. Besides all the language built-in array functions, the following goodies are available on observable arrays as well:

clear() removes all current entries from the array.
replace(newItems) replaces all existing entries in the array with new ones.
remove(value) removes a single item by value from the array and returns true if the item was found and removed.
If the values in the array should not be turned into observables automatically, use the { deep: false } option to make the array shallowly observable.

observable.map
{🚀} Usage: observable.map(initialMap?, options?)

Creates a new observable ES6 Map based on the provided initialMap. They are very useful if you don't want to react just to the change of a specific entry, but also to their addition and removal. Creating observable Maps is the recommended approach for creating dynamically keyed collections if you don't have enabled Proxies.

Besides all the language built-in Map functions, the following goodies are available on observable Maps as well:

toJSON() returns a shallow plain object representation of this Map (use toJS for a deep copy).
merge(values) copies all entries from the provided values (plain object, array of entries or a string-keyed ES6 Map) into this Map.
replace(values) replaces the entire contents of this Map with the provided values.
If the values in the Map should not be turned into observables automatically, use the { deep: false } option to make the Map shallowly observable.

observable.set
{🚀} Usage: observable.set(initialSet?, options?)

Creates a new observable ES6 Set based on the provided initialSet. Use it whenever you want to create a dynamic set where the addition and removal of values needs to be observed, but where values can appear only once in the entire collection.

If the values in the Set should not be turned into observables automatically, use the { deep: false } option to make the Set shallowly observable.

Unlike Map keys, Set values are not tracked individually.

observable.ref
Usage: observable.ref (annotation) (further information)

Like the observable annotation, but only reassignments will be tracked. The assigned values themselves won't be made observable automatically. For example, use this if you intend to store immutable data in an observable field.

observable.shallow
Usage: observable.shallow (annotation) (further information)

Like the observable.ref annotation, but for collections. Any collection assigned will be made observable, but the contents of the collection itself won't become observable.

observable.struct
{🚀} Usage: observable.struct (annotation) (further information)

Like the observable annotation, except that any assigned value that is structurally equal to the current value will be ignored.

observable.deep
{🚀} Usage: observable.deep (annotation) (further information)

Alias for the observable annotation.

observable.box
{🚀} Usage: observable.box(value, options?)

All primitive values in JavaScript are immutable and hence per definition not observable. Usually that is fine, as MobX can just make the property that contains the value observable. In rare cases, it can be convenient to have an observable primitive that is not owned by an object. For such cases, it is possible to create an observable box that manages such a primitive.

observable.box(value) accepts any value and stores it inside a box. The current value can be accessed through .get() and updated using .set(newValue).

import { observable, autorun } from "mobx"

const cityName = observable.box("Vienna")

autorun(() => {
    console.log(cityName.get())
})
// Prints: 'Vienna'

cityName.set("Amsterdam")
// Prints: 'Amsterdam'
If the values in the box should not be turned into observables automatically, use the { deep: false } option to make the box shallowly observable.

Actions
An action is any piece of code that modifies the state.

action
Usage: action(fn), action (annotation) or @action (method / field decorator) (further information)

Use on functions that intend to modify the state.

runInAction
{🚀} Usage: runInAction(fn) (further information)

Create a one-time action that is immediately invoked.

flow
Usage: flow(fn), flow (annotation) or @flow (generator method decorator) (further information)

MobX friendly replacement for async / await that supports cancellation.

flowResult
Usage: flowResult(flowFunctionResult) (further information)

For TypeScript users only. Utility that casts the output of the generator to a promise. This is just a type-wise correction for the promise wrapping done by flow. At runtime it directly returns the inputted value.

Computeds
Computed values can be used to derive information from other observables.

computed
Usage: computed(fn, options?), computed(options?) (annotation) or @computed (getter decorator) (further information)

Creates an observable value that is derived from other observables, but won't be recomputed unless one of the underlying observables changes.

React integration
From the mobx-react / mobx-react-lite packages.

observer
Usage: observer(component) (further information)

A higher order component you can use to make a functional or class based React component re-render when observables change.

Observer
Usage: <Observer>{() => rendering}</Observer> (further information)

Renders the given render function, and automatically re-renders it once one of the observables used in the render function changes.

useLocalObservable
Usage: useLocalObservable(() => source, annotations?) (further information)

Creates a new observable object using makeObservable, and keeps it around in the component for the entire life-cycle of the component.

Reactions
The goal of reactions is to model side effects that happen automatically.

autorun
Usage: autorun(() => effect, options?) (further information)

Reruns a function every time anything it observes changes.

reaction
Usage: reaction(() => data, data => effect, options?) (further information)

Reruns a side effect when any selected data changes.

when
Usage: when(() => condition, () => effect, options?) or await when(() => condition, options?) (further information)

Executes a side effect once when a observable condition becomes true.

Utilities
Utilities that might make working with observable objects or computed values more convenient. Less trivial utilities can also be found in the mobx-utils package.

onReactionError
{🚀} Usage: onReactionError(handler: (error: any, derivation) => void)

Attaches a global error listener, which is invoked for every error that is thrown from a reaction. This can be used for monitoring or test purposes.

intercept
{🚀} Usage: intercept(propertyName|array|object|Set|Map, listener) (further information)

Intercepts changes before they are applied to an observable API. Returns a disposer function that stops the interception.

observe
{🚀} Usage: observe(propertyName|array|object|Set|Map, listener) (further information)

Low-level API that can be used to observe a single observable value. Returns a disposer function that stops the interception.

onBecomeObserved
{🚀} Usage: onBecomeObserved(observable, property?, listener: () => void) (further information)

Hook for when something becomes observed.

onBecomeUnobserved
{🚀} Usage: onBecomeUnobserved(observable, property?, listener: () => void) (further information)

Hook for when something stops being observed.

toJS
Usage: toJS(value) (further information)

Recursively converts an observable object to a JavaScript object. Supports observable arrays, objects, Maps and primitives.

It does NOT recurse into non-observables, these are left as they are, even if they contain observables. Computed and other non-enumerable properties are completely ignored and won't be returned.

For more complex (de)serialization scenarios, it is recommended to give classes a (computed) toJSON method, or use a serialization library like serializr.

const obj = mobx.observable({
    x: 1
})

const clone = mobx.toJS(obj)

console.log(mobx.isObservableObject(obj)) // true
console.log(mobx.isObservableObject(clone)) // false
Configuration
Fine-tuning your MobX instance.

configure
Usage: sets global behavior settings on the active MobX instance. (further information) Use it to change how MobX behaves as a whole.

Collection utilities {🚀}
They enable manipulating observable arrays, objects and Maps with the same generic API. This can be useful in environments without Proxy support, but is otherwise typically not needed.

values
{🚀} Usage: values(array|object|Set|Map) (further information)

Returns all values in the collection as an array.

keys
{🚀} Usage: keys(array|object|Set|Map) (further information)

Returns all keys / indices in the collection as an array.

entries
{🚀} Usage: entries(array|object|Set|Map) (further information)

Returns a [key, value] pair of every entry in the collection as an array.

set
{🚀} Usage: set(array|object|Map, key, value) (further information)

Updates the collection.

remove
{🚀} Usage: remove(array|object|Map, key) (further information)

Removes item from the collection.

has
{🚀} Usage: has(array|object|Map, key) (further information)

Checks for membership in the collection.

get
{🚀} Usage: get(array|object|Map, key) (further information)

Gets value from the collection with key.

Introspection utilities {🚀}
Utilities that might come in handy if you want to inspect the internal state of MobX, or want to build cool tools on top of MobX.

isObservable
{🚀} Usage: isObservable(array|object|Set|Map)

Is the object / collection made observable by MobX?

isObservableProp
{🚀} Usage: isObservableProp(object, propertyName)

Is the property observable?

isObservableArray
{🚀} Usage: isObservableArray(array)

Is the value an observable array?

isObservableObject
{🚀} Usage: isObservableObject(object)

Is the value an observable object?

isObservableSet
{🚀} Usage: isObservableSet(set)

Is the value an observable Set?

isObservableMap
{🚀} Usage: isObservableMap(map)

Is the value an observable Map?

isBoxedObservable
{🚀} Usage: isBoxedObservable(value)

Is the value an observable box, created using observable.box?

isAction
{🚀} Usage: isAction(func)

Is the function marked as an action?

isComputed
{🚀} Usage: isComputed(boxedComputed)

Is this a boxed computed value, created using computed(() => expr)?

isComputedProp
{🚀} Usage: isComputedProp(object, propertyName)

Is this a computed property?

trace
{🚀} Usage: trace(), trace(true) (enter debugger) or trace(object, propertyName, enterDebugger?) (further information)

Should be used inside an observer, reaction or computed value. Logs when the value is invalidated, or sets the debugger breakpoint if called with true.

spy
{🚀} Usage: spy(eventListener) (further information)

Registers a global spy listener that listens to all events that happen in MobX.

getDebugName
{🚀} Usage: getDebugName(reaction|array|Set|Map) or getDebugName(object|Map, propertyName) (further information)

Returns the (generated) friendly debug name for an observable or reaction.

getDependencyTree
{🚀} Usage: getDependencyTree(object, computedPropertyName) (further information)

Returns a tree structure with all observables the given reaction / computation currently depends upon.

getObserverTree
{🚀} Usage: getObserverTree(array|Set|Map) or getObserverTree(object|Map, propertyName) (further information)

Returns a tree structure with all reactions / computations that are observing the given observable.

Extending MobX {🚀}
In the rare case you want to extend MobX itself.

createAtom
{🚀} Usage: createAtom(name, onBecomeObserved?, onBecomeUnobserved?) (further information)

Creates your own observable data structure and hooks it up to MobX. Used internally by all observable data types. Atom exposes two report methods to notify MobX with when:

reportObserved(): the atom has become observed, and should be considered part of the dependency tree of the current derivation.
reportChanged(): the atom has changed, and all derivations depending on it should be invalidated.
getAtom
{🚀} Usage: getAtom(thing, property?) (further information)

Returns the backing atom.

transaction
{🚀} Usage: transaction(worker: () => any)

Transaction is a low-level API. It is recommended to use action or runInAction instead.

Used to batch a bunch of updates without running any reactions until the end of the transaction. Like untracked, it is automatically applied by action, so usually it makes more sense to use actions than to use transaction directly.

It takes a single, parameterless worker function as an argument, and returns any value that was returned by it. Note that transaction runs completely synchronously and can be nested. Only after completing the outermost transaction, the pending reactions will be run.

import { observable, transaction, autorun } from "mobx"

const numbers = observable([])

autorun(() => console.log(numbers.length, "numbers!"))
// Prints: '0 numbers!'

transaction(() => {
    transaction(() => {
        numbers.push(1)
        numbers.push(2)
    })
    numbers.push(3)
})
// Prints: '3 numbers!'
untracked
{🚀} Usage: untracked(worker: () => any)

Untracked is a low-level API. It is recommended to use reaction, action or runInAction instead.

Runs a piece of code without establishing observers. Like transaction, untracked is automatically applied by action, so usually it makes more sense to use actions than to use untracked directly.

const person = observable({
    firstName: "Michel",
    lastName: "Weststrate"
})

autorun(() => {
    console.log(
        person.lastName,
        ",",
        // This untracked block will return the person's
        // firstName without establishing a dependency.
        untracked(() => person.firstName)
    )
})
// Prints: 'Weststrate, Michel'

person.firstName = "G.K."
// Doesn't print!

person.lastName = "Chesterton"
// Prints: 'Chesterton, G.K.'
← Reactions {🚀}React integration →
Core APIs
Creating observables
makeObservable
makeAutoObservable
extendObservable
observable
observable.object
observable.array
observable.map
observable.set
observable.ref
observable.shallow
observable.struct
observable.deep
observable.box
Actions
action
runInAction
flow
flowResult
Computeds
computed
React integration
observer
Observer
useLocalObservable
Reactions
autorun
reaction
when
Utilities
onReactionError
intercept
observe
onBecomeObserved
onBecomeUnobserved
toJS
Configuration
configure
Collection utilities {🚀}
values
keys
entries
set
remove
has
get
Introspection utilities {🚀}
isObservable
isObservableProp
isObservableArray
isObservableObject
isObservableSet
isObservableMap
isBoxedObservable
isAction
isComputed
isComputedProp
trace
spy
getDebugName
getDependencyTree
getObserverTree
Extending MobX {🚀}
createAtom
getAtom
transaction
untracked
MobX 🇺🇦
Docs
About MobX
The gist of MobX


React integration
This documentation outlines how to manually apply observation to React components. However, by using the mobx-react-observer Babel/SWC plugin, you can automatically handle observation without manual intervention. Still, understanding how MobX observation integrates with React components remains valuable, even when leveraging automated solutions.

import { observer } from "mobx-react-lite" // Or "mobx-react".

const MyComponent = observer(props => ReactElement)
While MobX works independently from React, they are most commonly used together. In The gist of MobX you have already seen the most important part of this integration: the observer HoC that you can wrap around a React component.

observer is provided by a separate React bindings package you choose during installation. In this example, we're going to use the more lightweight mobx-react-lite package.

import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

class Timer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed += 1
    }
}

const myTimer = new Timer()

// A function component wrapped with `observer` will react
// to any future change in an observable it used before.
const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

ReactDOM.render(<TimerView timer={myTimer} />, document.body)

setInterval(() => {
    myTimer.increaseTimer()
}, 1000)
Hint: you can play with the above example yourself on CodeSandbox.

The observer HoC automatically subscribes React components to any observables that are used during rendering. As a result, components will automatically re-render when relevant observables change. It also makes sure that components don't re-render when there are no relevant changes. So, observables that are accessible by the component, but not actually read, won't ever cause a re-render.

In practice this makes MobX applications very well optimized out of the box and they typically don't need any additional code to prevent excessive rendering.

For observer to work, it doesn't matter how the observables arrive in the component, only that they are read. Reading observables deeply is fine, complex expression like todos[0].author.displayName work out of the box. This makes the subscription mechanism much more precise and efficient compared to other frameworks in which data dependencies have to be declared explicitly or be pre-computed (e.g. selectors).

Local and external state
There is great flexibility in how state is organized, since it doesn't matter (technically that is) which observables we read or where observables originated from. The examples below demonstrate different patterns on how external and local observable state can be used in components wrapped with observer.

Using external state in observer components
using props
using global variables
using React context
Observables can be passed into components as props (as in the example above):

import { observer } from "mobx-react-lite"

const myTimer = new Timer() // See the Timer definition above.

const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

// Pass myTimer as a prop.
ReactDOM.render(<TimerView timer={myTimer} />, document.body)
Using local observable state in observer components
Since observables used by observer can come from anywhere, they can be local state as well. Again, different options are available for us.

`useState` with observable class
`useState` with local observable object
`useLocalObservable` hook
The simplest way to use local observable state is to store a reference to an observable class with useState. Note that, since we typically don't want to replace the reference, we totally ignore the updater function returned by useState:

import { observer } from "mobx-react-lite"
import { useState } from "react"

const TimerView = observer(() => {
    const [timer] = useState(() => new Timer()) // See the Timer definition above.
    return <span>Seconds passed: {timer.secondsPassed}</span>
})

ReactDOM.render(<TimerView />, document.body)
If you want to automatically update the timer like we did in the original example, useEffect could be used in typical React fashion:

useEffect(() => {
    const handle = setInterval(() => {
        timer.increaseTimer()
    }, 1000)
    return () => {
        clearInterval(handle)
    }
}, [timer])
You might not need locally observable state
In general, we recommend to not resort to MobX observables for local component state too quickly, as this can theoretically lock you out of some features of React's Suspense mechanism. As a rule of thumb, use MobX observables when the state captures domain data that is shared among components (including children). Such as todo items, users, bookings, etc.

State that only captures UI state, like loading state, selections, etc, might be better served by the useState hook, since this will allow you to leverage React suspense features in the future.

Using observables inside React components adds value as soon as they are either 1) deep, 2) have computed values or 3) are shared with other observer components.

Always read observables inside observer components
You might be wondering, when do I apply observer? The rule of thumb is: apply observer to all components that read observable data.

observer only enhances the component you are decorating, not the components called by it. So usually all your components should be wrapped by observer. Don't worry, this is not inefficient. On the contrary, more observer components make rendering more efficient as updates become more fine-grained.

Tip: Grab values from objects as late as possible
observer works best if you pass object references around as long as possible, and only read their properties inside the observer based components that are going to render them into the DOM / low-level components. In other words, observer reacts to the fact that you 'dereference' a value from an object.

In the above example, the TimerView component would not react to future changes if it was defined as follows, because the .secondsPassed is not read inside the observer component, but outside, and is hence not tracked:

const TimerView = observer(({ secondsPassed }) => <span>Seconds passed: {secondsPassed}</span>)

React.render(<TimerView secondsPassed={myTimer.secondsPassed} />, document.body)
Note that this is a different mindset from other libraries like react-redux, where it is a good practice to dereference early and pass primitives down, to better leverage memoization. If the problem is not entirely clear, make sure to check out the Understanding reactivity section.

Don't pass observables into components that aren't observer
Components wrapped with observer only subscribe to observables used during their own rendering of the component. So if observable objects / arrays / maps are passed to child components, those have to be wrapped with observer as well. This is also true for any callback based components.

If you want to pass observables to a component that isn't an observer, either because it is a third-party component, or because you want to keep that component MobX agnostic, you will have to convert the observables to plain JavaScript values or structures before passing them on.

To elaborate on the above, take the following example observable todo object, a TodoView component (observer) and an imaginary GridRow component that takes a column / value mapping, but which isn't an observer:

class Todo {
    title = "test"
    done = true

    constructor() {
        makeAutoObservable(this)
    }
}

const TodoView = observer(({ todo }: { todo: Todo }) =>
   // WRONG: GridRow won't pick up changes in todo.title / todo.done
   //        since it isn't an observer.
   return <GridRow data={todo} />

   // CORRECT: let `TodoView` detect relevant changes in `todo`,
   //          and pass plain data down.
   return <GridRow data={{
       title: todo.title,
       done: todo.done
   }} />

   // CORRECT: using `toJS` works as well, but being explicit is typically better.
   return <GridRow data={toJS(todo)} />
)
Callback components might require <Observer>
Imagine the same example, where GridRow takes an onRender callback instead. Since onRender is part of the rendering cycle of GridRow, rather than TodoView's render (even though that is where it syntactically appears), we have to make sure that the callback component uses an observer component. Or, we can create an in-line anonymous observer using <Observer />:

const TodoView = observer(({ todo }: { todo: Todo }) => {
    // WRONG: GridRow.onRender won't pick up changes in todo.title / todo.done
    //        since it isn't an observer.
    return <GridRow onRender={() => <td>{todo.title}</td>} />

    // CORRECT: wrap the callback rendering in Observer to be able to detect changes.
    return <GridRow onRender={() => <Observer>{() => <td>{todo.title}</td>}</Observer>} />
})
Tips
Server Side Rendering (SSR)
Note: mobx-react vs. mobx-react-lite
Note: observer or React.memo?
Tip: observer for class based React components
Tip: nice component names in React DevTools
{🚀} Tip: when combining observer with other higher-order-components, apply observer first
{🚀} Tip: deriving computeds from props
{🚀} Tip: useEffect and observables
How can I further optimize my React components?
Check out the React optimizations {🚀} section.

Troubleshooting
Help! My component isn't re-rendering...

Make sure you didn't forget observer (yes, this is the most common mistake).
Verify that the thing you intend to react to is indeed observable. Use utilities like isObservable, isObservableProp if needed to verify this at runtime.
Check the console logs in the browsers for any warnings or errors.
Make sure you grok how tracking works in general. Check out the Understanding reactivity section.
Read the common pitfalls as described above.
Configure MobX to warn you of unsound usage of mechanisms and check the console logs.
Use trace to verify that you are subscribing to the right things or check what MobX is doing in general using spy / the mobx-log package.
← API