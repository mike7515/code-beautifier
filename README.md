# README
## Code Beautifier Visual Studio Code Extension


**Beautify css, sass and less code (extension for Visual Studio Code)**

Command "beautify.format"

If you beautify other languages ​​the code/text will be beautified to Visual Studio Code's default formatter.

#### Options:
> beautify.options
```
{
  indent_size?: number;
  indent_char?: string;
  eol?: string;
  indent_level?: number;
  indent_with_tabs?: boolean;
  preserve_newlines?: boolean;
  max_preserve_newlines?: number;
  jslint_happy?: boolean;
  space_after_anon_function?: boolean;
  brace_style?: 'collapse-preserve-inline' | 'collapse' | 'expand' | 'end-expand' | 'none';
  keep_array_indentation?: boolean;
  keep_function_indentation?: boolean;
  space_before_conditional?: boolean;
  space_in_empty_paren?: boolean;
  break_chained_methods?: boolean;
  eval_code?: boolean;
  unescape_strings?: boolean;
  wrap_line_length?: number;
  wrap_attributes?: 'auto' | 'force';
  wrap_attributes_indent_size?: number;
  end_with_newline?: boolean;
}
```