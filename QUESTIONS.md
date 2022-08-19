### 1. What is the difference between Component and PureComponent? give an
example where it might break my app.

R. The main difference between then is in pure components you need control when shouldComponentUpdate is called, consequently, it increases performance. In cases that you can use pure components you check following this scenarios: 
 - State/Props is imutable.
 - State/Props must not have a hierarchy
 - You need control forceUpdate, dispatch, actions
 - The children components must be pure

### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

R. It's because of the number of re-renders you can have in the application.

### 3. Describe 3 ways to pass information from a component to its PARENT.

R. 
   - We can pass a function to child component and when this function is fired we can pass any data to parent.
   - We can set values in redux and will be acessible to parents
   - We can create a function, return the elements plus the values we need.. Example:        
        ```
        useCount = () => {
          const [count, setCount] = useState(0)

          return {
            count,
            render: <div>{count}</div>
          }
        }
        ```

### 4. Give 2 ways to prevent components from re-rendering.

R. - Use unique keys in lists
   - Can use React.memo, to memoized your component, 
   - Can use useCallback and sometimes use useMemo.
   - Moving state down. 

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

R. Fragment is used when you want to return multiples elements, without using an additional wrapper dom.

we can use like this:
```
<>
  <Text>Line1</Text>
  <Text>Line2</Text>
</>
```

or when you have a list you can use like this,
```
 <Container>
    {list.map(item => 
      <Fragment key={item.id}>
        <Title>item.name</Title>
        {item.subtitle && <Subtitle>item.name</Subtitle>}
      </Fragment>
    )}
  </Container>
```

### 6. Give 3 examples of the HOC pattern.

R. HOC is a cmponent that receive another component. I know 2 patterns we can have: Compose, Hooks.


### 7. what's the difference in handling exceptions in promises, callbacks and async...await.

R. 
- In promises we need to handle with resolve and reject;
- In Callbacks we need to have a catch;
- in Async await we can handle using try catch as a wrapper;

### 8. How many arguments does setState take and why is it async.

R. Accept 2 arguments, usually we pass one, but you can call a function, after the state is updated.

### 9. List the steps needed to migrate a Class to Function Component.

R. - Change class to function, 
   - remove render method, 
   - transform methods to functions, 
   - remove constructor, 
   - use useEffect for update side effects, 
   - use useState for update states, 
   - replace this.


### 10. List a few ways styles can be used with components.

R. styled components, inline, CSS, SASS.

### 11. How to render an HTML string coming from the server.

R. You can use dangerouslySetInnerHTML to render your HTML strings.