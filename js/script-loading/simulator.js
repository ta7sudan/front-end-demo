function exec(script) {
	console.log('The script must execute immediately.');
}
function determineScriptType(str) {
	if (str.match(/\w+\/\w+/)) {
		return 'classic';
	} else if (str === 'module') {
		return 'module'
	} else {
		return null;
	}
}
function gettingAnEncoding(charset) {
	return 'utf8';
}
function moduleScriptCredentialsMode(crossorigin) {
	if (crossorigin === 'anonymous') {
		return;
	} else if (crossorigin === 'use-credentials') {
		return 'include';
	} else {
		return 'omit';
	}
}

function createClassicScript(opts) {
	return {
		msg: 'result of create classic script algorithm'
	};
}

function createModuleScript(opts) {
	return {
		msg: 'result of create classic script algorithm'
	};
}
/**
 * 下面三个获取算法是异步的
 */
function fetchClassicScript(url, settingObject, options, classicScriptCORSSetting, encoding) {
	return new Promise(rs => {
		setTimeout(() => {
			rs({
				msg: 'result of fetch classic script algorithm'
			});
		}, 0);
	});
}

function fetchModuleScript(url, settingObject, script, options) {
	return new Promise(rs => {
		setTimeout(() => {
			rs({
				msg: 'result of fetch module script algorithm'
			});
		}, 0);
	});
}

function fetchDescedantsInstantiate(args) {
	return new Promise(rs => {
		setTimeout(() => {
			rs({
				msg: 'result of fetch descendants and instantiate algorithm'
			});
		}, 0);
	});
}

function parseURL(src, document) {
	/**
	 * TODO
	 */
	return true;
}

function CSPCheck(script) {
	/**
	 * TODO
	 */
	return 'something';
}

const listWillExecDocFinishedParsering = [],
			listWillExecInOrderAsSoonAsPossible = [];
const setWillExecAsSoonAsPossible = new Set();

var pendingParseingBlockingScript = null;

function reset() {
	listWillExecDocFinishedParsering.length = 0;
	listWillExecInOrderAsSoonAsPossible.length = 0;
	setWillExecAsSoonAsPossible.clear();
	pendingParseingBlockingScript = null;
}


async function prepareScript(script) {
	/**
	 * 1. If the script element is marked as having "already started",
	 * then return. The script is not executed.
	 */
	if (script.alreadyStarted) {
		return;
	}
	/**
	 * 2. If the element has its "parser-inserted" flag set, then set
	 * was-parser-inserted to true and unset the element's "parser-inserted" 
	 * flag. Otherwise, set was-parser-inserted to false.
	 */
	if (script.parserInserted) {
		var wasParserInserted = true;
		script.parserInserted = false;
	} else {
		wasParserInserted = false;
	}
	/**
	 * 3. If was-parser-inserted is true and the element does not have an async
	 * attribute, then set the element's "non-blocking" flag to true.
	 */
	if (wasParserInserted && !script.async) {
		script.nonBlocking = true;
	}
	/**
	 * 4. Let source text be the element's child text content.
	 */
	var sourceText = script.textContent;
	/**
	 * 5. If the element has no src attribute, and source text is the empty
	 * string, then return. The script is not executed.
	 */
	if (!script.src && !sourceText) {
		return;
	}
	/**
	 * 6. If the element is not connected, then return. The script is not executed.
	 */
	if (!script.connected) {
		return;
	}
	/**
	 * 7. If either:
	 * the script element has a type attribute and its value is the empty string, or
	 * the script element has no type attribute but it has a language attribute and that attribute's value is the empty string, or
	 * the script element has neither a type attribute nor a language attribute, then
	 * let the script block's type string for this script element be "text/javascript".
	 * Otherwise, if the script element has a type attribute, let the script block's
	 * type string for this script element be the value of that attribute with
	 * leading and trailing ASCII whitespace stripped.
	 * Otherwise, the element has a non-empty language attribute; let the script
	 * block's type string for this script element be the concatenation of the
	 * string "text/" followed by the value of the language attribute.
	 */
	if (script.type && !script.type.trim()
	|| !script.type && script.language && !script.language.trim()
	|| !script.type && !script.language) {
		var scriptBlocksTypeString = 'text/javascript';
	} else if (script.type) {
		scriptBlocksTypeString = script.type.trim();
	} else if (script.language) {
		scriptBlocksTypeString = `text/${script.language}`;
	}
	script.scriptsType = determineScriptType(scriptBlocksTypeString);
	if (script.scriptsType === null) {
		return;
	}
	/**
	 * 8. If was-parser-inserted is true, then flag the element as
	 * "parser-inserted" again, and set the element's "non-blocking" flag to false.
	 */
	if (wasParserInserted) {
		script.parserInserted = true;
		script.nonBlocking = false;
	}
	/**
	 * 9. Set the element's "already started" flag.
	 */
	script.alreadyStarted = true;
	/**
	 * 10. If the element is flagged as "parser-inserted", but the element's node
	 * document is not the Document of the parser that created the element, then return.
	 */
	if (script.parserInserted && script.nodeDocument != script.parserDocument) {
		return;
	}
	/**
	 * 11. If scripting is disabled for the script element, then return.
	 * The script is not executed.
	 */
	if (script.disabled) {
		return;
	}
	/**
	 * 12. If the script element has a nomodule content attribute and
	 * the script's type is "classic", then return. The script is not executed.
	 */
	if (script.nomodule && script.scriptsType === 'classic') {
		return;
	}
	/**
	 * 13. If the script element does not have a src content attribute, and the
	 * Should element's inline behavior be blocked by Content Security Policy?
	 * algorithm returns "Blocked" when executed upon the script element,
	 * "script", and source text, then return. The script is not executed.
	 */
	if (!script.src && CSPCheck(script) === 'Blocked') {
		return;
	}
	/**
	 * 14.
	 */
	if (script.event && script.for) {
		/**
		 * TODO 这步不是很重要, 算了吧
		 */
	}
	/**
	 * 15.
	 */
	if (script.charset) {
		/**
		 * TODO 这步设置脚本编码, 也不是很重要
		 */
		var encoding = gettingAnEncoding(script.charset);
	} else {
		encoding = script.nodeDocument.encoding;
	}
	/**
	 * 16. Let classic script CORS setting be the current state of the element's
	 * crossorigin content attribute.
	 */
	var classicScriptCORSSetting = script.crossorigin;
	/**
	 * 17. Let module script credentials mode be the module script credentials
	 * mode for the element's crossorigin content attribute.
	 */
	var credentialsMode = moduleScriptCredentialsMode(script.crossorigin);
	/**
	 * 上面两步都是根据 crossorigin 设置 CORS 相关的
	 */
	/**
	 * 18. Let cryptographic nonce be the element's [[CryptographicNonce]]
	 * internal slot's value.
	 */
	var cryptographicNonce = 'sth';
	/**
	 * 19. If the script element has an integrity attribute, then let integrity
	 * metadata be that attribute's value.
	 */
	if (script.integrity) {
		var integrityMetadata = script.integrity;
	} else {
		integrityMetadata = '';
	}
	/**
	 * 20. Let parser metadata be "parser-inserted" if the script element has
	 * been flagged as "parser-inserted", and "not-parser-inserted" otherwise.
	 */
	var parserMetadata = script.parserInserted ? 'parser-inserted' : 'not-parser-inserted';
	/**
	 * 21. Let options be a script fetch options whose cryptographic nonce is
	 * cryptographic nonce, integrity metadata is integrity metadata, parser
	 * metadata is parser metadata, credentials mode is module script credentials
	 * mode, and referrer policy is the empty string.
	 */
	var options = {
		cryptographicNonce,
		integrityMetadata,
		parserMetadata,
		credentialsMode,
		referrerPolicy: ''
	};
	/**
	 * 22. Let settings object be the element's node document's Window object's
	 * environment settings object.
	 */
	var settingObject = script.nodeDocument.window.envSettingObject;
	/**
	 * 23. & 24.
	 */
	if (script.src) {
		var src = script.src;
		if (!src) {
			script.onerror();
			return;
		}
		script.fromAnExternalFile = true;
		if(!parseURL(src, script.nodeDocument)) {
			script.onerror();
			return;
		} else {
			var url = parseURL(src, script.nodeDocument);
		}
		if (script.scriptsType === 'classic') {
			var rst23 = await fetchClassicScript(url, settingObject, options, classicScriptCORSSetting, encoding);
		} else if (script.scriptsType === 'module') {
			rst23 = await fetchModuleScript(url, settingObject, 'script', options);
		}
		script.scriptsScript = rst23;
		script.isReady = true;
	} else {
		var baseURL = script.nodeDocument.documentBaseURL;
		if (script.scriptsType === 'classic') {
			let scpt = createClassicScript(sourceText, settingObject, baseURL, options); 
			script.scriptsScript = scpt;
			script.isReady = true;
		} else if (script.scriptsType === 'module') {
			let scpt = createModuleScript(sourceText, settingObject, baseURL, options);
			if (!scpt) {
				script.scriptsScript = null;
				script.isReady = true;
				return;
			}
			var rst24 = await fetchDescedantsInstantiate('script');
			script.scriptsScript = rst24;
			script.isReady = true;
		}
	}

	/**
	 * 25. 最重要的一步!!!
	 */
	if (script.scriptsType === 'classic' && script.src
			&& script.defer && script.parserInserted && !script.async
			|| script.scriptsType === 'module' && script.parserInserted
			&& !script.async) {
		listWillExecDocFinishedParsering.push(script);
	} else if (script.scriptsType === 'classic' && script.src
			&& script.parserInserted && !script.async) {
		pendingParseingBlockingScript = script;
	} else if (script.scriptsType === 'classic' && script.src
			&& !script.async && !script.nonBlocking
			|| script.scriptsType === 'module' && !script.async && !script.nonBlocking) {
		listWillExecInOrderAsSoonAsPossible.push(script);
	} else if (script.scriptsType === 'classic' && script.src || script.scriptsType === 'module') {
		setWillExecAsSoonAsPossible.add(script);
	} else if (!script.src && script.parserInserted && script.hasCSSBlocked) {
		// 这里其实还少了两个判断条件, 不是很好模拟
		pendingParseingBlockingScript = script;
	} else {
		exec(script);
	}

	console.log('list of scripts that will execute when the document has finished parsing', listWillExecDocFinishedParsering.toString());
	console.log('list of scripts that will execute in order as soon as possible', listWillExecInOrderAsSoonAsPossible.toString());
	console.log('set of scripts that will execute as soon as possible', Array.from(setWillExecAsSoonAsPossible).toString());
	console.log('pending parsing-blocking script', pendingParseingBlockingScript && pendingParseingBlockingScript.toString());
	console.log('\n');
}

class Script {
	/**
	 * 
	 * config can also have language, charset, type, textContent, nodeDocument, parserDocument, disabled, nomodule
	 */
	constructor(config = {}) {
		const doc = {
			encoding: 'utf8',
			documentBaseURL: '/',
			window: {
				envSettingObject: {}
			}
		};
		const defaults = {
			alreadyStarted: false,
			parserInserted: false,
			nonBlocking: true,
			readyToBeParserExecuted: false,
			scriptsType: null,
			fromAnExternalFile: false,
			scriptsScript: null,
			__isReady: false,
			__connected: false,
			async: false,
			defer: false,
			textContent: '',
			nodeDocument: doc,
			parserDocument: doc,
			disabled: false,
			nomodule: false,
			name: ''
		};
		Object.assign(this, defaults, config);
		config.src != undefined && (this.src = config.src);
		config.async != undefined && (this.async = config.async);
		config.connected != undefined && (this.connected = config.connected);
		config.textContent != undefined && (this.textContent = config.textContent);
		config.isReady != undefined && (this.isReady = config.isReady);

		/**
		 * Mark the element as being "parser-inserted" and unset
		 * the element's "non-blocking" flag.
		 */
		if (this.parserInserted) {
			this.nonBlocking = false;
		}
	}
	/**
	 * The sixth is a flag indicating whether or not the script is from an
	 * external file. It is determined when the script is prepared, based on
	 * the src attribute of the element at that time.
	 */
	set src(val) {
		this.fromAnExternalFile = !!val;
		/**
		 * The script element is connected and has a src attribute set where
		 * previously the element had no such attribute.
		 */
		if (!this.parserInserted && this.connected && this.__src === undefined) {
			this.__src = val;
			// prepareScript(this);
		} else {
			this.__src = val;
		}
	}
	get src() {
		return this.__src;
	}
	/**
	 * whenever a script element whose "non-blocking" flag is set
	 * has an async content attribute added, the element's "non-blocking" flag 
	 * must be unset.
	 */
	set async(val) {
		this.__async = val;
		this.nonBlocking = !val;
	}
	get async() {
		return this.__async;
	}
	/**
	 * The script element becomes connected.
	 */
	set connected(val) {
		if (!this.parserInserted && !this.connected && val) {
			this.__connected = val;
			// prepareScript(this);
		} else {
			this.__connected = val;
		}
	}
	get connected() {
		return this.__connected;
	}
	/**
	 * The script element is connected and a node or document fragment is
	 * inserted into the script element, after any script elements inserted
	 * at that time.
	 */
	set textContent(val) {
		if (!this.parserInserted && this.connected && this.__textContent === undefined && val) {
			this.__textContent = val;
			// prepareScript(this);
		} else {
			this.__textContent = val;
		}
	}
	get textContent() {
		return this.__textContent;
	}
	set isReady(val) {
		this.__isReady = val;
		if (val) {
			this.readyToBeParserExecuted = true;
		}
	}
	get isReady() {
		return this.__isReady;
	}

	onload() {
		console.log('onload');
	}
	onerror() {
		console.log('onerror');
	}
	onDOMContentLoaded() {
		console.log('onDOMContentLoaded');
	}
	toString() {
		return this.name;
	}
}

(async function () {
	console.log('script A:');
	/**
	 * result is pending parsing-blocking script
	 */
	let a = new Script({name: 'A', parserInserted: true, connected: true, textContent: 'log'});
	// let a = new Script({name: 'A', parserInserted: true, connected: true, hasCSSBlocked: true, textContent: 'log'});
	await prepareScript(a);
	reset();

	console.log('script B:');
	/**
	 * result is pending parsing-blocking script
	 */
	let b = new Script({name: 'B', parserInserted: true, connected: true, textContent: 'log', defer: true});
	await prepareScript(b);
	reset();

	console.log('script C:');
	/**
	 * result is pending parsing-blocking script
	 */
	let c = new Script({name: 'C', parserInserted: true, connected: true, textContent: 'log', defer: false});
	await prepareScript(c);
	reset();

	console.log('script D:');
	/**
	 * result is pending parsing-blocking script
	 */
	let d = new Script({name: 'D', parserInserted: true, connected: true, textContent: 'log', async: true});
	await prepareScript(d);
	reset();

	console.log('script E:');
	/**
	 * result is pending parsing-blocking script
	 */
	let e = new Script({name: 'E', parserInserted: true, connected: true, textContent: 'log', async: false});
	await prepareScript(e);
	reset();
	
	console.log('script F:');
	/**
	 * result is pending parsing-blocking script
	 */
	let f = new Script({name: 'F', parserInserted: true, connected: true, src: 'log'});
	await prepareScript(f);
	reset();

	console.log('script G:');
	/**
	 * result is list of scripts that will execute when the document has finished parsing
	 */
	let g = new Script({name: 'G', parserInserted: true, connected: true, src: 'log', defer: true});
	await prepareScript(g);
	reset();

	console.log('script H:');
	/**
	 * result is pending parsing-blocking script
	 */
	let h = new Script({name: 'H', parserInserted: true, connected: true, src: 'log', defer: false});
	await prepareScript(h);
	reset();

	console.log('script I:');
	/**
	 * result is set of scripts that will execute as soon as possible
	 */
	let i = new Script({name: 'I', parserInserted: true, connected: true, src: 'log', async: true});
	await prepareScript(i);
	reset();

	console.log('script J:');
	/**
	 * result is pending parsing-blocking script
	 */
	let j = new Script({name: 'J', parserInserted: true, connected: true, src: 'log', async: false});
	await prepareScript(j);
	reset();

	console.log('script K:');
	/**
	 * result is execute immediately
	 */
	let k = new Script({name: 'K', connected: true, textContent: 'log'});
	await prepareScript(k);
	reset();

	console.log('script L:');
	/**
	 * result is execute immediately
	 */
	let l = new Script({name: 'L', connected: true, textContent: 'log', defer: true});
	await prepareScript(l);
	reset();

	console.log('script M:');
	/**
	 * result is execute immediately
	 */
	let m = new Script({name: 'M', connected: true, textContent: 'log', defer: false});
	await prepareScript(m);
	reset();

	console.log('script N:');
	/**
	 * result is execute immediately
	 */
	let n = new Script({name: 'N', connected: true, textContent: 'log', async: true});
	await prepareScript(n);
	reset();

	console.log('script O:');
	/**
	 * result is execute immediately
	 */
	let o = new Script({name: 'O', connected: true, textContent: 'log', async: false});
	await prepareScript(o);
	reset();

	console.log('script P:');
	/**
	 * result is set of scripts that will execute as soon as possible
	 */
	let p = new Script({name: 'P', connected: true, src: 'log'});
	await prepareScript(p);
	reset();

	console.log('script Q:');
	/**
	 * result is set of scripts that will execute as soon as possible
	 */
	let q = new Script({name: 'Q', connected: true, src: 'log', defer: true});
	await prepareScript(q);
	reset();

	console.log('script R:');
	/**
	 * result is set of scripts that will execute as soon as possible
	 */
	let r = new Script({name: 'R', connected: true, src: 'log', defer: false});
	await prepareScript(r);
	reset();

	console.log('script S:');
	/**
	 * result is set of scripts that will execute as soon as possible
	 */
	let s = new Script({name: 'S', connected: true, src: 'log', async: true});
	await prepareScript(s);
	reset();

	console.log('script T:');
	/**
	 * result is set of scripts that will execute as soon as possible
	 */
	let t = new Script({name: 'T', connected: true, src: 'log', async: false});
	await prepareScript(t);
	reset();
})();
// prepareScript(a);
