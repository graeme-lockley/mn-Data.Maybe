
The Maybe type is used to represent optional values and can be seen as something like a type-safe null, where
`Nothing` is `null` and `Just(x)` is the non-null value `x`.

### Nothing

```haskell
Nothing :: Maybe a
```


### Just

```haskell
Just :: a -> Maybe a
```


### reduce

```haskell
Maybe a => reduce :: (() -> b) -> (a -> b) -> b
```


### withDefault

```haskell
Maybe a => withDefault :: a -> a
```


#### Examples:

```haskell
Just(1).withDefault(10) === 1
Nothing.withDefault(10) === 10
```

### map

```haskell
Maybe a => map :: (a -> b) -> Maybe b
```


#### Examples:

```haskell
Just(10).map(x => x * 2).withDefault(0) === 20
Nothing.map(x => x * 2).withDefault(0) === 0
```

### map2

```haskell
Maybe a => map2 :: (a -> b -> c) -> Maybe b -> Maybe c
```


#### Examples:

```haskell
Just(10).map2(Just(20))(a => b => a * b).withDefault(0) === 200
Nothing.map2(Just(20))(a => b => a * b).withDefault(0) === 0
Just(10).map2(Nothing)(a => b => a * b).withDefault(0) === 0
```

### then

```haskell
Maybe a => then :: (a -> Maybe b) -> Maybe b
```


#### Examples:

```haskell
Just(10).then(a => Just(a * 20)).withDefault(0) === 200
Just(10).then(a => Nothing).withDefault(0) === 0
Nothing.then(a => Just(a * 20)).withDefault(0) === 0
```

### catch

```haskell
Maybe a => catch :: (() -> Maybe a) -> Maybe a
```


#### Examples:

```haskell
Just(10).catch(a => Just(100)).withDefault(0) === 10
Just(10).catch(a => Nothing).withDefault(0) === 10
Nothing.catch(a => Just(20)).withDefault(0) === 20
```

### isJust

```haskell
Maybe a => isJust :: () -> Bool
```


#### Examples:

```haskell
Just(10).isJust()
!Nothing.isJust()
```

### isNothing

```haskell
Maybe a => isNothing :: () -> Bool
```


#### Examples:

```haskell
!Just(10).isNothing()
Nothing.isNothing()
```

### asNative

```haskell
Maybe a => asNative :: () => Data.Native.Maybe a
```

Converts this into a native `Maybe`.

#### Examples:

```haskell
Just(10).asNative() == NativeMaybe.Just(10)
Nothing.asNative() == NativeMaybe.Nothing
```

### asNative

```haskell
Maybe a => asNative :: () => Data.Native.Maybe a
```

Constructs an instance of `Maybe` from a native maybe.

#### Examples:

```haskell
ofNative(NativeMaybe.Just(10)) == Just(10)
ofNative(NativeMaybe.Nothing) == Nothing
```


## Dependencies

* [Data.Native.Maybe (1.3.0)](https://github.com/graeme-lockley/mn-Data.Native.Maybe)