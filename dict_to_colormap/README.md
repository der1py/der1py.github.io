# 🎨 dict_to_colormap

A lightweight utility to convert RGB colormap definitions into NumPy array format for easy visualization or use in semantic segmentation tasks.

## 🧠 Purpose

When working with semantic segmentation, colormaps are often defined as dictionaries of RGB tuples. This tool parses such definitions and transforms them into a numpy array that can be used with `matplotlib`, PyTorch, or OpenCV for rendering and debugging model outputs.

For example, given a dictinoary colormap like:

```python
MY_DICT = {
    (0, 0, 0): 0, # background
    (255, 0, 0): 1, # class name
    (0, 255, 0): 2, # class name
}
```

It produces a numpy array:

```python
COLORMAP = np.array(
	[
		[0, 0, 0], # background
		[255, 0, 0], # class name
		[0, 255, 0], # class name
	]
)
```

## 🖼️ Demo

https://der1py.github.io/dict_to_colormap/

## 🛠️ Credits

AI was used to generate a lot of the CSS and README