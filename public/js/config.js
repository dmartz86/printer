var Printer = {};

/**
 * Database types.
 */
Printer.DB_TYPES = {
	MEMORY : "memory",
	MONGO : "mongo"
};

/**
 * URL:
 * mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
 * Sample: mongodb://admin:admin@localhost:270001/
 */
Printer.db = {
	"URL" : ""
};

// Parameters. A JSON API must response with this information.
Printer.config = {
	"web notifications" : true,
	"desktop notificatios" : true,
	"db" : Printer.DB_TYPES.MEMORY
};

Printer.Storage = {
	files : [],
	reports : []
};

Printer.FileModel = {
	"dev" : 0,
	"mode" : 33206,
	"nlink" : 1,
	"uid" : 0,
	"gid" : 0,
	"rdev" : 0,
	"ino" : 0,
	"size" : 1540,
	"atime" : "",
	"mtime" : "",
	"ctime" : ""
};

Printer.HotFolder = "";

Printer.fileTypes = {
	'.doc' : 'Microsoft Word Document',
	'.docx' : 'Microsoft Word Open XML Document',
	'.log' : 'Log File',
	'.msg' : 'Outlook Mail Message',
	'.odt' : 'OpenDocument Text Document',
	'.pages' : 'Pages Document',
	'.rtf' : 'Rich Text Format File',
	'.tex' : 'LaTeX Source Document',
	'.txt' : 'Plain Text File',
	'.wpd' : 'WordPerfect Document',
	'.wps' : 'Microsoft Works Word Processor Document',
	'.indd' : 'Adobe InDesign Document',
	'.pct' : 'Picture File',
	'.pdf' : 'Portable Document Format File',
	'.xlr' : 'Works Spreadsheet',
	'.xls' : 'Excel Spreadsheet',
	'.xlsx' : 'Microsoft Excel Open XML Spreadsheet',
	'.bmp' : 'Bitmap Image File',
	'.dds' : 'DirectDraw Surface',
	'.gif' : 'Graphical Interchange Format File',
	'.jpg' : 'JPEG Image',
	'.png' : 'Portable Network Graphic',
	'.psd' : 'Adobe Photoshop Document',
	'.pspimage' : 'PaintShop Pro Image',
	'.tga' : 'Targa Graphic',
	'.thm' : 'Thumbnail Image File',
	'.tif' : 'Tagged Image File',
	'.tiff' : 'Tagged Image File Format',
	'.yuv' : 'YUV Encoded Image File'
};

try {
	module.exports = Printer;
} catch (e) {
	//Ignore this error because node and browser use this configuration file
	//NodeJS implements require, but browser does not need it.
}