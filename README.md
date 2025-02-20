# Expo ImagePicker `file:///` URI Handling Issue

This repository demonstrates a common issue encountered when using the Expo ImagePicker library.  The problem arises when the selected image URI begins with `file:///`, which is not always correctly handled by Expo's built-in Image component.

## Problem

The ImagePicker returns URIs prefixed with `file:///`.  When attempting to display the image using Expo's Image component, the image fails to load or render.

## Solution

The solution involves converting the `file:///` URI to a data URL using a library capable of handling file system access (requires additional permissions and potentially async operations).