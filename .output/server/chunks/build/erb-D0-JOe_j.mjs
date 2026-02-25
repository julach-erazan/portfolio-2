import html from "./html-GC16tDh9.mjs";
import ruby from "./ruby-CPCASdTw.mjs";
import "./javascript-BsAkV7mL.mjs";
import "./css-BtVcDqlU.mjs";
import "./haml-DrIklt7F.mjs";
import "./xml-BMzZeaqs.mjs";
import "./java-BfXh-0uJ.mjs";
import "./sql-DzUuSofg.mjs";
import "./graphql-CwmtR1ib.mjs";
import "./typescript-CP6ECzON.mjs";
import "./jsx-BPmvoin2.mjs";
import "./tsx-CmGGo4Hm.mjs";
import "./cpp-zh2ePAE_.mjs";
import "./regexp-BxWeO75u.mjs";
import "./glsl-CGsiYPcu.mjs";
import "./c-C4VtT7JA.mjs";
import "./shellscript-CQ8MXh-D.mjs";
import "./lua-BVbbqwZC.mjs";
import "./yaml-B_vW5iTY.mjs";
const lang = Object.freeze(JSON.parse('{"displayName":"ERB","fileTypes":["erb","rhtml","html.erb"],"injections":{"text.html.erb - (meta.embedded.block.erb | meta.embedded.line.erb | comment)":{"patterns":[{"begin":"^(\\\\s*)(?=<%+#(?![^%]*%>))","beginCaptures":{"0":{"name":"punctuation.whitespace.comment.leading.erb"}},"end":"(?!\\\\G)(\\\\s*$\\\\n)?","endCaptures":{"0":{"name":"punctuation.whitespace.comment.trailing.erb"}},"patterns":[{"include":"#comment"}]},{"begin":"^(\\\\s*)(?=<%(?![^%]*%>))","beginCaptures":{"0":{"name":"punctuation.whitespace.embedded.leading.erb"}},"end":"(?!\\\\G)(\\\\s*$\\\\n)?","endCaptures":{"0":{"name":"punctuation.whitespace.embedded.trailing.erb"}},"patterns":[{"include":"#tags"}]},{"include":"#comment"},{"include":"#tags"}]}},"name":"erb","patterns":[{"include":"text.html.basic"}],"repository":{"comment":{"patterns":[{"begin":"<%+#","beginCaptures":{"0":{"name":"punctuation.definition.comment.begin.erb"}},"end":"%>","endCaptures":{"0":{"name":"punctuation.definition.comment.end.erb"}},"name":"comment.block.erb"}]},"tags":{"patterns":[{"begin":"<%+(?!>)[-=]?(?![^%]*%>)","beginCaptures":{"0":{"name":"punctuation.section.embedded.begin.erb"}},"contentName":"source.ruby","end":"(-?%)>","endCaptures":{"0":{"name":"punctuation.section.embedded.end.erb"},"1":{"name":"source.ruby"}},"name":"meta.embedded.block.erb","patterns":[{"captures":{"1":{"name":"punctuation.definition.comment.erb"}},"match":"(#).*?(?=-?%>)","name":"comment.line.number-sign.erb"},{"include":"source.ruby"}]},{"begin":"<%+(?!>)[-=]?","beginCaptures":{"0":{"name":"punctuation.section.embedded.begin.erb"}},"contentName":"source.ruby","end":"(-?%)>","endCaptures":{"0":{"name":"punctuation.section.embedded.end.erb"},"1":{"name":"source.ruby"}},"name":"meta.embedded.line.erb","patterns":[{"captures":{"1":{"name":"punctuation.definition.comment.erb"}},"match":"(#).*?(?=-?%>)","name":"comment.line.number-sign.erb"},{"include":"source.ruby"}]}]}},"scopeName":"text.html.erb","embeddedLangs":["html","ruby"]}'));
const erb = [
  ...html,
  ...ruby,
  lang
];
export {
  erb as default
};
